import { solutions } from "../content";
import { useLanguage } from "../i18n";
import { trpc } from "../providers/trpc";

export function useSolutions() {
  const { lang } = useLanguage();
  const { data: overrides = [] } = trpc.content.solutionOverrides.useQuery();

  return solutions.map((solution) => {
    const override = overrides.find((item) => item.slug === solution.slug);
    if (!override) return solution;
    return {
      ...solution,
      name: lang === "fr" ? override.nameFr : override.nameEn,
      summary: { fr: override.summaryFr, en: override.summaryEn },
    };
  });
}
