import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ensureAdminIndexes } from "@/lib/admin/indexes";
import { getMockProducts } from "@/lib/mock-feed";
import {
  asDate,
  containsFilter,
  parsePagination,
  parseSort,
  requireAdminSession,
  serializeList,
} from "@/lib/admin/server";

const VALID_STATUSES = ["ACTIVE", "DRAFT", "ARCHIVED"];

export async function GET(request) {
  const auth = await requireAdminSession();
  if (!auth.ok) return auth.response;

  try {
    const db = await getDb();
    await ensureAdminIndexes(db);
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams, { defaultLimit: 12, maxLimit: 60 });
    const sort = parseSort(searchParams, ["createdAt", "updatedAt", "name", "stock", "price"], { updatedAt: -1 });

    const query = {
      ...containsFilter("name", searchParams.get("q")),
    };

    const category = searchParams.get("category");
    if (category) {
      query.category = category;
    }

    const brand = searchParams.get("brand");
    if (brand) {
      query.brand = brand;
    }

    const status = searchParams.get("status");
    if (status && VALID_STATUSES.includes(status)) {
      query.status = status;
    }

    const [items, total] = await Promise.all([
      db.collection("products")
        .find(query, {
          projection: {
            name: 1,
            slug: 1,
            sku: 1,
            price: 1,
            brand: 1,
            category: 1,
            brandSlug: 1,
            categorySlug: 1,
            stock: 1,
            status: 1,
            image: 1,
            description: 1,
            updatedAt: 1,
            createdAt: 1,
            featured: 1,
          },
        })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection("products").countDocuments(query),
    ]);

    if (!total && !searchParams.get("q") && !searchParams.get("category") && !searchParams.get("brand") && !searchParams.get("status")) {
      return NextResponse.json({
        items: getMockProducts(),
        pagination: {
          page,
          limit,
          total: getMockProducts().length,
          totalPages: 1,
        },
        isMock: true,
      });
    }

    return NextResponse.json({
      items: serializeList(items),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (error) {
    console.error("ADMIN_PRODUCTS_GET_ERROR", error);
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}

export async function POST(request) {
  const auth = await requireAdminSession();
  if (!auth.ok) return auth.response;

  try {
    const payload = await request.json();
    const validation = validateProductPayload(payload);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const db = await getDb();
    await ensureAdminIndexes(db);
    const now = new Date();

    const normalized = {
      name: payload.name.trim(),
      slug: buildProductSlug(payload),
      sku: payload.sku.trim().toUpperCase(),
      price: Number(payload.price),
      brand: payload.brand.trim(),
      brandSlug: slugify(payload.brand),
      category: payload.category.trim(),
      categorySlug: slugify(payload.category),
      stock: Number(payload.stock),
      status: payload.status,
      image: payload.image?.trim() || "",
      description: payload.description?.trim() || "",
      featured: Boolean(payload.featured),
      tags: Array.isArray(payload.tags)
        ? payload.tags.map((tag) => String(tag).trim()).filter(Boolean)
        : [],
      createdAt: asDate(payload.createdAt) || now,
      updatedAt: now,
      createdBy: auth.session.user.id,
    };

    const existingSku = await db.collection("products").findOne({ sku: normalized.sku });
    if (existingSku) {
      return NextResponse.json({ error: "SKU already exists" }, { status: 409 });
    }

    const result = await db.collection("products").insertOne(normalized);
    return NextResponse.json({ id: result.insertedId.toString() }, { status: 201 });
  } catch (error) {
    console.error("ADMIN_PRODUCTS_POST_ERROR", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

function validateProductPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Invalid payload" };
  }

  if (!payload.name || !String(payload.name).trim()) {
    return { ok: false, error: "Product name is required" };
  }

  if (!payload.sku || !String(payload.sku).trim()) {
    return { ok: false, error: "SKU is required" };
  }

  if (!payload.category || !String(payload.category).trim()) {
    return { ok: false, error: "Category is required" };
  }

  if (!payload.brand || !String(payload.brand).trim()) {
    return { ok: false, error: "Brand is required" };
  }

  const price = Number(payload.price);
  if (!Number.isFinite(price) || price < 0) {
    return { ok: false, error: "Price must be a non-negative number" };
  }

  const stock = Number(payload.stock);
  if (!Number.isInteger(stock) || stock < 0) {
    return { ok: false, error: "Stock must be a non-negative integer" };
  }

  if (!VALID_STATUSES.includes(payload.status)) {
    return { ok: false, error: "Invalid status" };
  }

  return { ok: true };
}

function buildProductSlug(payload) {
  return slugify(`${payload.brand || ''}-${payload.category || ''}-${payload.name || ''}-${payload.sku || ''}`);
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
