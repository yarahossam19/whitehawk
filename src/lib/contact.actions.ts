"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(320),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(5000),
  source: z.string().trim().max(60).optional(),
});

export async function submitContactMessage(input: unknown) {
  const data = contactSchema.parse(input);
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  const { error } = await supabase.from("contact_messages").insert({
    name: data.name,
    email: data.email,
    company: data.company || null,
    message: data.message,
    source: data.source || "contact",
  });
  if (error) throw new Error(error.message);
  return { ok: true as const };
}
