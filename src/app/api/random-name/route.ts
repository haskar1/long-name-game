import { db } from "@/db/index";
import { namesTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const [randomName] = await db
    .select()
    .from(namesTable)
    .orderBy(sql`RANDOM()`)
    .limit(1);

  return NextResponse.json({ name: randomName?.name ?? "Michael Schofield" });
}
