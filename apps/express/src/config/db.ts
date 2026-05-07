import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const dbPromise = open({
  filename: "db.sqlite",
  driver: sqlite3.Database,
});

export const initDB = async () => {
  const db = await dbPromise;

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT UNIQUE,
      password TEXT
    );

    CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    imageUrl TEXT,
    userId INTEGER,
    createdAt TEXT,
    updatedAt TEXT
  );

  `);
};