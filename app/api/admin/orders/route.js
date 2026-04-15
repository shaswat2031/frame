import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ensureAdminIndexes } from "@/lib/admin/indexes";
import {
  containsFilter,
  parsePagination,
  parseSort,
  requireAdminSession,
  serializeList,
} from "@/lib/admin/server";

const VALID_STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export async function GET(request) {
  const auth = await requireAdminSession();
  if (!auth.ok) return auth.response;

  try {
    const db = await getDb();
    await ensureAdminIndexes(db);
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = parsePagination(searchParams, { defaultLimit: 15, maxLimit: 50 });
    const sort = parseSort(searchParams, ["createdAt", "totalAmount", "status"], { createdAt: -1 });

    const status = searchParams.get("status");
    const query = {
      ...(status && VALID_STATUSES.includes(status) ? { status } : {}),
    };

    const term = searchParams.get("q");
    if (term) {
      query.$or = [
        containsFilter("orderNumber", term),
        containsFilter("customerName", term),
        containsFilter("customerEmail", term),
      ];
    }

    const [items, total] = await Promise.all([
      db.collection("orders")
        .find(query, {
          projection: {
            orderNumber: 1,
            customerName: 1,
            customerEmail: 1,
            status: 1,
            totalAmount: 1,
            itemCount: 1,
            createdAt: 1,
          },
        })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection("orders").countDocuments(query),
    ]);

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
    console.error("ADMIN_ORDERS_GET_ERROR", error);
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
  }
}
