import ModulePageClient from "./ModulePageClient";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  return <ModulePageClient moduleId={moduleId} />;
}
