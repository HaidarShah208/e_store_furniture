import { motion } from "framer-motion";
import { Lightbulb, Target, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

const MissionVisionSection: React.FC = () => {
  const { t } = useTranslation();
  
  const items = [
    {
      title: t('about.missionVision.mission.title') || 'Our Mission',
      icon: <Target className="w-10 h-10 text-rustic_bronze" />,
      description: t('about.missionVision.mission.description') || 'To deliver exceptional furniture that enhances living spaces with quality craftsmanship and timeless design.',
      highlights: t('about.missionVision.mission.highlights', { returnObjects: true }) as string[] || ['Quality First', 'Customer Focus', 'Innovation'],
      gradient: 'from-rustic_bronze/20 to-clay_brown/10',
      borderColor: 'border-rustic_bronze/30',
    },
    {
      title: t('about.missionVision.vision.title') || 'Our Vision',
      icon: <Lightbulb className="w-10 h-10 text-deep_walnut" />,
      description: t('about.missionVision.vision.description') || 'To be the leading furniture brand known for sustainable practices and innovative designs that inspire.',
      highlights: t('about.missionVision.vision.highlights', { returnObjects: true }) as string[] || ['Sustainability', 'Innovation', 'Excellence'],
      gradient: 'from-deep_walnut/20 to-rustic_bronze/10',
      borderColor: 'border-deep_walnut/30',
    },
    {
      title: t('about.missionVision.values.title') || 'Our Values',
      icon: <ShieldCheck className="w-10 h-10 text-clay_brown" />,
      description: t('about.missionVision.values.description') || 'Integrity, craftsmanship, and customer satisfaction are the pillars of everything we do.',
      highlights: t('about.missionVision.values.highlights', { returnObjects: true }) as string[] || ['Integrity', 'Craftsmanship', 'Trust'],
      gradient: 'from-clay_brown/20 to-warm_caramel/10',
      borderColor: 'border-clay_brown/30',
    },
  ];

  return (
    <section className="child_container bg-linear-to-b from-ivory_sand to-soft_latte/50">
      <div className="mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4"
        >
          <span className="px-4 py-2 bg-dark_wood/10 text-dark_wood text-sm font-semi-bold rounded-full border border-dark_wood/20">
            {t('about.missionVision.badge') || '🎯 What Drives Us'}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="subheading font-bold text-dark_wood mb-6"
        >
          {t('about.missionVision.title') || 'Mission, Vision & Values'}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="content text-deep_walnut/80 max-w-3xl mx-auto"
        >
          {t('about.missionVision.subtitle') || 'Discover the core principles that guide our commitment to excellence and customer satisfaction.'}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group"
          >
            <div className="relative h-full">
              {/* Hover glow effect */}
              <div className={`absolute -inset-1 bg-linear-to-br ${item.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
              
              {/* Card */}
              <div className={`relative h-full bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 ${item.borderColor} shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 flex flex-col`}>
                {/* Icon container with animated background */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`relative inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-linear-to-br ${item.gradient} shadow-md group-hover:shadow-lg transition-all duration-300`}
                >
                  {item.icon}
                </motion.div>

                {/* Content */}
                <h3 className="subheading3 font-bold text-dark_wood mb-4">
                  {item.title}
                </h3>
                <p className="minicontent text-deep_walnut/80 mb-6 flex-1 leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights badges */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.highlights.map((highlight, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="px-3 py-1.5 bg-linear-to-r from-warm_caramel/30 to-clay_brown/20 text-dark_wood text-xs font-semi-bold rounded-full border border-clay_brown/20 hover:border-clay_brown/40 transition-colors duration-300"
                    >
                      {highlight}
                    </motion.span>
                  ))}
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-warm_caramel/20 to-transparent rounded-tr-3xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MissionVisionSection;
