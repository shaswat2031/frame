import { getDb } from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const user = await db.collection("users").findOne({ _id: new ObjectId(session.user.id) });
  
  return NextResponse.json(user?.addresses || []);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { address } = await req.json();
  if (!address) return NextResponse.json({ error: "Address data required" }, { status: 400 });

  const db = await getDb();
  const newAddress = {
    ...address,
    id: new ObjectId().toString(),
    isDefault: address.isDefault || false
  };

  // If new address is default, unset other defaults
  if (newAddress.isDefault) {
    await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      { $set: { "addresses.$[].isDefault": false } }
    );
  }

  await db.collection("users").updateOne(
    { _id: new ObjectId(session.user.id) },
    { $push: { addresses: newAddress } }
  );

  return NextResponse.json(newAddress);
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = await getDb();
  await db.collection("users").updateOne(
    { _id: new ObjectId(session.user.id) },
    { $pull: { addresses: { id: id } } }
  );

  return NextResponse.json({ success: true });
}
