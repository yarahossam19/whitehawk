"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import { getDb, nowIso } from "./db";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(320),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(5000),
  source: z.string().trim().max(60).optional(),
});

export async function submitContactMessage(input: unknown) {
  const data = contactSchema.parse(input);

  getDb()
    .prepare(
      `INSERT INTO contact_messages (id, name, email, company, message, source, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      randomUUID(),
      data.name,
      data.email,
      data.company || null,
      data.message,
      data.source || "contact",
      nowIso(),
    );

  return { ok: true as const };
}
