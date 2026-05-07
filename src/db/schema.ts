import { pgTable, serial, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { CLIENT_APP_TYPES } from "../common/constant.ts";
export const appTypeEnum = pgEnum("app_type", CLIENT_APP_TYPES as [string, ...string[]]);
  
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