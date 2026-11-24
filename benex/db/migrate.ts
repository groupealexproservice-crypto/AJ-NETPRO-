import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";

// Applies db/migrations to DATABASE_URL. Usable on hosts where drizzle-kit (a dev dependency) is not installed.
const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is required");
const connection = await mysql.createConnection(url);
await migrate(drizzle(connection), { migrationsFolder: "./db/migrations" });
await connection.end();
console.log("Migrations applied.");
