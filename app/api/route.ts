import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database | null = null;

export async function GET(): Promise<Response> {
  if (!db) {
    db = await open({
      filename: './collection.db',
      driver: sqlite3.Database
    });
  }

  const users = await db.all('SELECT * FROM users');

  return new Response(JSON.stringify(users), {
    headers: {
      'content-type': 'application/json'
    },
    status: 200
  });
}
