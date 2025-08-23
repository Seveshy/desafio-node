import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";

export const application = mysqlTable("application", {
  id: int("id").primaryKey().autoincrement(),
  numeroSerie: varchar("numeroSerie", { length: 255 }),
  modelo: varchar("modelo", { length: 255 }),
  fabricante: varchar("fabricante", { length: 255 }),
  created_at: timestamp("created_at").defaultNow(),
});
