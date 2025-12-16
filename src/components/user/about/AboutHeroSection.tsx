import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

const AboutHeroSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-linear-to-b from-warm_caramel via-soft_latte to-ivory_sand">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-linear-to-br from-warm_caramel/40 to-clay_brown/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-linear-to-tl from-rustic_bronze/30 to-deep_walnut/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-linear-to-r from-clay_brown/25 to-warm_caramel/20 rounded-full blur-2xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-12 text-center">
        {/* Decorative badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6"
        >
          <span className="px-6 py-2 bg-dark_wood/90 text-ivory_sand text-sm font-semi-bold rounded-full shadow-lg backdrop-blur-sm border border-rustic_bronze/30">
            ✨ {t('about.hero.badge') || 'Premium Furniture Craftsmanship'}
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="title font-bold text-dark_wood leading-tight mb-6"
        >
          {t('about.hero.titleLine1') || 'Crafting Your Dream Spaces'} <br />
          <span className="relative inline-block">
            <span className="bg-linear-to-r from-deep_walnut via-rustic_bronze to-clay_brown text-transparent bg-clip-text">
              {t('about.hero.titleLine2') || 'With Timeless Elegance'}
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-rustic_bronze to-clay_brown origin-left"
            />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="content text-deep_walnut/80 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {t('about.hero.description') || 'We bring you the finest handcrafted furniture that combines traditional artistry with contemporary design, transforming houses into homes since decades.'}
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
        >
          {[
            { value: "15+", label: t('about.hero.stats.years') || "Years Experience" },
            { value: "10K+", label: t('about.hero.stats.customers') || "Happy Customers" },
            { value: "500+", label: t('about.hero.stats.products') || "Products" },
            { value: "4.9★", label: t('about.hero.stats.rating') || "Rating" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5, type: "spring" }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-linear-to-br from-clay_brown/20 to-rustic_bronze/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-ivory_sand/60 backdrop-blur-md rounded-2xl p-6 border border-warm_caramel/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="subheading font-bold text-rustic_bronze mb-1">{stat.value}</div>
                <div className="microcontent text-deep_walnut/70">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.2 }, y: { duration: 2, repeat: Infinity } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-deep_walnut/60"
      >
        <span className="microcontent font-light">Scroll to explore</span>
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};

export default AboutHeroSection;
