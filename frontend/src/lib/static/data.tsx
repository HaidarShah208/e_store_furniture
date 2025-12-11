import slide1 from '@/assets/user/img/download (1).jpeg' 
import slide2 from '@/assets/user/img/download.jpeg' 
import slide3 from '@/assets/user/img/images.jpeg' 

export const getSlides = (t: any) => [
  {
    image: slide1,
    title: `${t("home.heroTitleLine1")} ${t("home.heroTitleLine2")}`,
    subtitle: t("home.heroSubtitle"),
    ctaPrimary: t("home.shopReadymade"),
    ctaSecondary: t("home.shopUnpolished"),
  },
  {
    image: slide2,
    title: t("home.featured"),
    subtitle: t("home.heroSubtitle"),
    ctaPrimary: t("home.shopUnpolished"),
    ctaSecondary: t("home.shopReadymade"),
  },
  {
    image: slide3,
    title: t("home.finishHeadline"),
    subtitle: t("home.heroSubtitle"),
    ctaPrimary: t("home.shopReadymade"),
    ctaSecondary: t("home.shopUnpolished"),
  },
];
