import runner from 'node-pg-migrate';
import { join } from "path";

export default async function migrations(request, response) {

  if(request.method === "GET") {
    const migrations = await runner({
      databaseUrl: process.env.DATABASE_URL,
      dir: join("infra", "migrations"),
      dryRun: true,
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
      noLock: true,
    })

    return response.status(200).json(migrations);
  }

  if(request.method === "POST") {
    const migrations = await runner({
      databaseUrl: process.env.DATABASE_URL,
      dir: join("infra", "migrations"),
      dryRun: false,
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
      noLock: true,
    })

    return response.status(200).json(migrations);
  }

  return response.status(405).end();
}
