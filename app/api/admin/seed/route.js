import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { requireAdminSession } from "@/lib/admin/server";
import {
  getMockCategories,
  getMockOrders,
  getMockProducts,
  getMockTickets,
  getMockUsers,
} from "@/lib/mock-feed";

export async function POST() {
  const auth = await requireAdminSession();
  if (!auth.ok) return auth.response;

  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Seeding disabled in production" }, { status: 403 });
  }

  try {
    const db = await getDb();

    const now = new Date();
    const products = getMockProducts().map((product) => ({
      ...product,
      createdAt: now,
      updatedAt: now,
      createdBy: auth.session.user.id,
    }));
    const orders = getMockOrders().map((order) => ({
      ...order,
      createdAt: new Date(order.createdAt),
      updatedAt: now,
      createdBy: auth.session.user.id,
    }));
    const tickets = getMockTickets().map((ticket) => ({
      ...ticket,
      createdAt: new Date(ticket.createdAt),
      updatedAt: new Date(ticket.updatedAt),
      createdBy: auth.session.user.id,
    }));
    const users = getMockUsers().map((user) => ({
      ...user,
      createdAt: new Date(user.createdAt),
      updatedAt: now,
      createdBy: auth.session.user.id,
    }));

    await Promise.all([
      db.collection("products").deleteMany({}),
      db.collection("orders").deleteMany({}),
      db.collection("supportTickets").deleteMany({}),
      db.collection("users").deleteMany({}),
    ]);

    if (users.length) {
      await db.collection("users").insertMany(users);
    }

    if (products.length) {
      await db.collection("products").insertMany(products);
    }

    if (orders.length) {
      await db.collection("orders").insertMany(orders);
    }

    if (tickets.length) {
      await db.collection("supportTickets").insertMany(tickets);
    }

    return NextResponse.json({
      message: "Promoted shared mock feed into persistent collections",
      counts: {
        products: products.length,
        orders: orders.length,
        supportTickets: tickets.length,
        users: users.length,
      },
      isMock: false,
    });
  } catch (error) {
    console.error("ADMIN_SEED_ERROR", error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
