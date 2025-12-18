import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  Star,
  Sofa,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const WhyChooseUsSection: React.FC = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      title: t('about.whyChooseUs.premiumQuality.title') || 'Premium Quality',
      description: t('about.whyChooseUs.premiumQuality.description') || 'Handcrafted furniture using the finest materials and traditional techniques.',
      icon: <Star className="w-8 h-8" />,
      iconColor: 'text-rustic_bronze',
      gradient: 'from-rustic_bronze/20 via-clay_brown/10 to-transparent',
      borderColor: 'from-rustic_bronze via-clay_brown to-warm_caramel',
    },
    {
      title: t('about.whyChooseUs.wideSelection.title') || 'Wide Selection',
      description: t('about.whyChooseUs.wideSelection.description') || 'Extensive collection of furniture pieces to suit every style and space.',
      icon: <Sofa className="w-8 h-8" />,
      iconColor: 'text-clay_brown',
      gradient: 'from-clay_brown/20 via-warm_caramel/10 to-transparent',
      borderColor: 'from-clay_brown via-warm_caramel to-soft_latte',
    },
    {
      title: t('about.whyChooseUs.secureDelivery.title') || 'Secure Delivery',
      description: t('about.whyChooseUs.secureDelivery.description') || 'Safe and timely delivery with professional handling and setup service.',
      icon: <Truck className="w-8 h-8" />,
      iconColor: 'text-deep_walnut',
      gradient: 'from-deep_walnut/20 via-rustic_bronze/10 to-transparent',
      borderColor: 'from-deep_walnut via-rustic_bronze to-clay_brown',
    },
    {
      title: t('about.whyChooseUs.customization.title') || 'Customization',
      description: t('about.whyChooseUs.customization.description') || 'Personalize your furniture with custom finishes, fabrics, and dimensions.',
      icon: <Wrench className="w-8 h-8" />,
      iconColor: 'text-warm_caramel',
      gradient: 'from-warm_caramel/20 via-soft_latte/10 to-transparent',
      borderColor: 'from-warm_caramel via-soft_latte to-ivory_sand',
    },
    {
      title: t('about.whyChooseUs.bestValue.title') || 'Best Value',
      description: t('about.whyChooseUs.bestValue.description') || 'Competitive pricing without compromising on quality or craftsmanship.',
      icon: <TrendingUp className="w-8 h-8" />,
      iconColor: 'text-rustic_bronze',
      gradient: 'from-rustic_bronze/15 via-clay_brown/10 to-transparent',
      borderColor: 'from-rustic_bronze via-clay_brown to-deep_walnut',
    },
    {
      title: t('about.whyChooseUs.certified.title') || 'Certified Excellence',
      description: t('about.whyChooseUs.certified.description') || 'Quality certified products backed by warranty and expert customer support.',
      icon: <ShieldCheck className="w-8 h-8" />,
      iconColor: 'text-deep_walnut',
      gradient: 'from-deep_walnut/15 via-dark_wood/5 to-transparent',
      borderColor: 'from-deep_walnut via-dark_wood to-rustic_bronze',
    },
  ];

  return (
    <section className="isolate_container bg-linear-to-b from-soft_latte/50 to-primary1">
      <div className="mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4"
        >
          <span className="px-4 py-2 bg-dark_wood/10 text-dark_wood text-sm font-semibold rounded-full border border-dark_wood/20 shadow-sm">
            {t('about.whyChooseUs.badge') || '⭐ Your Best Choice'}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="subheading font-bold text-dark_wood mb-6"
        >
          {t('about.whyChooseUs.title') || 'Why Choose Us'}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="content text-deep_walnut/80 max-w-3xl mx-auto"
        >
          {t('about.whyChooseUs.subtitle') || 'Experience the difference with our exceptional furniture and unmatched customer service.'}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl border-2 border-warm_caramel/30 hover:border-warm_caramel/60 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] overflow-hidden">
              {/* Shimmer effect using Tailwind */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-linear-to-r from-transparent via-white/40 to-transparent" />
              
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500`} />
              
              {/* Bottom gradient border */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-linear-to-r ${feature.borderColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full`} />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center gap-5 h-full">
                {/* Animated Icon with enhanced effects */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: [0, -8, 8, -8, 0] }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
                  className={`flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-ivory_sand via-soft_latte to-warm_caramel/30 shadow-md group-hover:shadow-2xl transition-all duration-300 ${feature.iconColor} ring-2 ring-transparent group-hover:ring-4 group-hover:ring-${feature.iconColor.replace('text-', '')}/20`}
                >
                  {feature.icon}
                </motion.div>

                {/* Title with enhanced effects */}
                <h3 className="subheading3 font-bold text-dark_wood group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-deep_walnut group-hover:to-rustic_bronze transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="minicontent text-deep_walnut/70 group-hover:text-deep_walnut leading-relaxed flex-1 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Decorative animated dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  className="w-2.5 h-2.5 rounded-full bg-linear-to-r from-rustic_bronze to-clay_brown mt-auto group-hover:scale-150 group-hover:shadow-lg transition-all duration-300"
                />
              </div>

              {/* Corner decoration with enhanced effect */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-warm_caramel/30 to-transparent rounded-tr-3xl group-hover:from-warm_caramel/50 transition-colors duration-500" />
              
              {/* Additional corner glow effect */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-linear-to-br from-rustic_bronze/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
