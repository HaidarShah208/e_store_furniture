import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageCircle } from "lucide-react";

const ContactHeroSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-linear-to-b from-warm_caramel via-soft_latte to-ivory_sand">
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
          <span className="px-6 py-2 bg-dark_wood/90 text-ivory_sand text-sm font-semi-bold rounded-full shadow-lg backdrop-blur-sm border border-rustic_bronze/30 inline-flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            {t('contact.hero.badge') || '💬 Get in Touch'}
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="title font-bold text-dark_wood leading-tight mb-6"
        >
          {t('contact.hero.titleLine1') || 'We\'re Here to Help'} <br />
          <span className="relative inline-block">
            <span className="bg-linear-to-r from-deep_walnut via-rustic_bronze to-clay_brown text-transparent bg-clip-text">
              {t('contact.hero.titleLine2') || 'Let\'s Create Together'}
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
          className="content text-deep_walnut/80 max-w-3xl mx-auto leading-relaxed"
        >
          {t('contact.hero.description') || 'Have a question about our furniture or need expert advice? Our team is ready to assist you with personalized recommendations and support.'}
        </motion.p>
      </div>
    </section>
  );
};

export default ContactHeroSection;
