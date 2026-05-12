import { notFound } from "next/navigation";
import { SolutionsPage, getSolutionsConfig, SOLUTION_TYPES } from "@/features/solutions";

export function generateStaticParams() {
  return SOLUTION_TYPES.map((type) => ({ type }));
}

export default async function SolutionVariantPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const config = getSolutionsConfig(type);
  if (!config) notFound();
  return <SolutionsPage config={config} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const config = getSolutionsConfig(type);
  if (!config) return { title: "Solutions", description: "WhiteHawk Solutions" };

  const title = config.metaTitle || `${config.title} | WhiteHawk Solutions`;
  const description = config.metaDescription || config.hero.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}
