import { integer,pgTable,varchar,text } from "drizzle-orm/pg-core";
// this is the schema for the user which will be registered in our database
export const userTable = pgTable("users",{
    name: varchar({length:255}).notNull(),
    email: varchar({length:255}).notNull().unique(),
    password: text('password').notNull(),
    salt: text('salt').notNull(),// this salt wil help us to keep password safe
})