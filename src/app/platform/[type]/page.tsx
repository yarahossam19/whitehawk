import { notFound } from "next/navigation";
import { PlatformPage, getPlatformConfig, PLATFORM_TYPES } from "@/features/platform";

export function generateStaticParams() {
  return PLATFORM_TYPES.map((type) => ({ type }));
}

export default async function PlatformVariantPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const config = getPlatformConfig(type);
  if (!config) notFound();
  return <PlatformPage config={config} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const config = getPlatformConfig(type);
  if (!config) return { title: "Platform", description: "WhiteHawk Platform" };
  return {
    title: `${config.title} | WhiteHawk Platform`,
    description: config.hero.subtitle,
  };
}