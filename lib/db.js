import Knex from "knex";

let knexInstance = globalThis.__knex || undefined;

/**
 * Returns a singleton Knex instance configured for PostgreSQL.
 * Expects DATABASE_URL to be set (e.g. postgres://user:pass@host:5432/dbname).
 */
export function getDb() {
  if (!knexInstance) {

    knexInstance = Knex({
      client: "pg",
      connection: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    },
      pool: { min: 0, max: 10 },
    });

    if (process.env.NODE_ENV !== "production") {
      globalThis.__knex = knexInstance;
    }
  }
  return knexInstance;
}

/**
 * Reads projects from the database.
 * Expects a 'projects' table with columns: id (number), description (string).
 */
export async function getProjects() {
  const db = getDb();
  return db("projects").select("id", "description").orderBy("id");
}
