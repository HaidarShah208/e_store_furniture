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
    },
    {
      title: t('about.whyChooseUs.wideSelection.title') || 'Wide Selection',
      description: t('about.whyChooseUs.wideSelection.description') || 'Extensive collection of furniture pieces to suit every style and space.',
      icon: <Sofa className="w-8 h-8" />,
      iconColor: 'text-clay_brown',
      gradient: 'from-clay_brown/20 via-warm_caramel/10 to-transparent',
    },
    {
      title: t('about.whyChooseUs.secureDelivery.title') || 'Secure Delivery',
      description: t('about.whyChooseUs.secureDelivery.description') || 'Safe and timely delivery with professional handling and setup service.',
      icon: <Truck className="w-8 h-8" />,
      iconColor: 'text-deep_walnut',
      gradient: 'from-deep_walnut/20 via-rustic_bronze/10 to-transparent',
    },
    {
      title: t('about.whyChooseUs.customization.title') || 'Customization',
      description: t('about.whyChooseUs.customization.description') || 'Personalize your furniture with custom finishes, fabrics, and dimensions.',
      icon: <Wrench className="w-8 h-8" />,
      iconColor: 'text-warm_caramel',
      gradient: 'from-warm_caramel/20 via-soft_latte/10 to-transparent',
    },
    {
      title: t('about.whyChooseUs.bestValue.title') || 'Best Value',
      description: t('about.whyChooseUs.bestValue.description') || 'Competitive pricing without compromising on quality or craftsmanship.',
      icon: <TrendingUp className="w-8 h-8" />,
      iconColor: 'text-rustic_bronze',
      gradient: 'from-rustic_bronze/15 via-clay_brown/10 to-transparent',
    },
    {
      title: t('about.whyChooseUs.certified.title') || 'Certified Excellence',
      description: t('about.whyChooseUs.certified.description') || 'Quality certified products backed by warranty and expert customer support.',
      icon: <ShieldCheck className="w-8 h-8" />,
      iconColor: 'text-deep_walnut',
      gradient: 'from-deep_walnut/15 via-dark_wood/5 to-transparent',
    },
  ];

  return (
    <>
      <style>
        {`
          .shimmer-card {
            position: relative;
            overflow: hidden;
          }
          
          .shimmer-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(237, 224, 212, 0.4), transparent);
            transition: left 0.7s ease;
          }
          
          .shimmer-card:hover::before {
            left: 100%;
          }

          .gradient-border {
            position: relative;
          }

          .gradient-border::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #9C6644, #B08968, #DDB892);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.6s ease;
          }

          .gradient-border:hover::after {
            transform: scaleX(1);
          }
        `}
      </style>
      <section className="isolate_container bg-linear-to-b from-soft_latte/50 to-ivory_sand">
        <div className="mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-dark_wood/10 text-dark_wood text-sm font-semi-bold rounded-full border border-dark_wood/20">
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
              <div className="shimmer-card gradient-border relative h-full bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-warm_caramel/30 transition-all duration-500 hover:-translate-y-2">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center gap-4 h-full">
                  {/* Animated Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-ivory_sand to-soft_latte shadow-md group-hover:shadow-xl transition-all duration-300 ${feature.iconColor}`}
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="subheading3 font-bold text-dark_wood group-hover:text-deep_walnut transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="minicontent text-deep_walnut/70 leading-relaxed flex-1">
                    {feature.description}
                  </p>

                  {/* Decorative dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    className={`w-2 h-2 rounded-full bg-linear-to-r from-rustic_bronze to-clay_brown mt-auto`}
                  />
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-bl from-warm_caramel/20 to-transparent rounded-tr-3xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default WhyChooseUsSection;
