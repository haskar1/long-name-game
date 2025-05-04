import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { namesTable } from "./db/schema";
import fs from "fs/promises";
import path from "path";

const db = drizzle(process.env.DATABASE_URL!);

const BATCH_SIZE = 100;

// Script to load names from names.json into database
// Run script in terminal using 'npx tsx src/index.ts'
async function main() {
  // Load names from JSON file
  const filePath = path.join(__dirname, "names.json");
  const rawData = await fs.readFile(filePath, "utf-8");
  const nameList: string[] = JSON.parse(rawData);

  // Map to insert objects
  const insertData = nameList.map((name) => ({ name }));

  // Insert in batches
  for (let i = 0; i < insertData.length; i += BATCH_SIZE) {
    const batch = insertData.slice(i, i + BATCH_SIZE);
    await db.insert(namesTable).values(batch);
    console.log(`Inserted batch ${i / BATCH_SIZE + 1}`);
  }

  console.log(`✅ Finished inserting ${insertData.length} names.`);
}

main().catch((err) => {
  console.error("❌ Error inserting names:", err);
});
