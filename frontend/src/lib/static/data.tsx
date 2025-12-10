 

export const getSlides = (t: any) => [
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80&auto=format&fit=crop",
    title: `${t("home.heroTitleLine1")} ${t("home.heroTitleLine2")}`,
    subtitle: t("home.heroSubtitle"),
    ctaPrimary: t("home.shopReadymade"),
    ctaSecondary: t("home.shopUnpolished"),
  },
  {
    image: "https://images.unsplash.com/photo-1577140917170-285929db55cc?w=1600&q=80&auto=format&fit=crop",
    title: t("home.featured"),
    subtitle: t("home.heroSubtitle"),
    ctaPrimary: t("home.shopUnpolished"),
    ctaSecondary: t("home.shopReadymade"),
  },
  {
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80&auto=format&fit=crop",
    title: t("home.finishHeadline"),
    subtitle: t("home.heroSubtitle"),
    ctaPrimary: t("home.shopReadymade"),
    ctaSecondary: t("home.shopUnpolished"),
  },
];
