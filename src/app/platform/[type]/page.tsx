import { notFound } from "next/navigation";
import {
  PlatformPage,
  getPlatformConfig,
  PLATFORM_TYPES,
  type PlatformType,
} from "@/features/platform";

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
  return <PlatformPage platformType={type as PlatformType} config={config} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const config = getPlatformConfig(type);
  if (!config) return { title: "Platform", description: "WhiteHawk Platform" };

  const title = config.metaTitle || `${config.title} | WhiteHawk Platform`;
  const description = config.metaDescription || config.hero.subtitle;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}
