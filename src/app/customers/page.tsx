import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CustomersClient } from "./customers-client";

export const metadata: Metadata = pageMetadata({
  path: "/customers",
  title: "Customer stories — WhiteHawk",
  description:
    "Read how security teams in finance, healthcare and government run their program on WhiteHawk.",
  ogTitle: "WhiteHawk customer stories",
  ogDescription: "Case studies from teams shipping security faster on WhiteHawk.",
});

export default function CustomersPage() {
  return <CustomersClient />;
}
