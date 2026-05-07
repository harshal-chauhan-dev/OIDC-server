import { pgTable, serial, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const appTypeEnum = pgEnum("app_type", [
    "web",
    "app",
  ]);
  
export const clients = pgTable("clients", {
    id: serial("id").primaryKey(),
    appName: varchar("app_name", { length: 255 }).notNull(),
    clientId: varchar("client_id", { length: 255 }).notNull(),
    clientSecret: varchar("client_secret", { length: 255 }).notNull(),
    redirectUris: text("redirect_uris").array().notNull(),
    appType: appTypeEnum("app_type").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});