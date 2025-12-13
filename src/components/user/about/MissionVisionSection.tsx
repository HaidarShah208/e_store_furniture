import { motion } from "framer-motion";
import { Lightbulb, Target, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "./card";
import { useTranslation } from "react-i18next";

const MissionVisionSection: React.FC = () => {
  const { t } = useTranslation();
  
  const items = [
    {
      title: t('about.missionVision.mission.title'),
      icon: <Target className="w-8 h-8 text-indigo-600" />,
      description: t('about.missionVision.mission.description'),
      highlights: t('about.missionVision.mission.highlights', { returnObjects: true }) as string[],
    },
    {
      title: t('about.missionVision.vision.title'),
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      description: t('about.missionVision.vision.description'),
      highlights: t('about.missionVision.vision.highlights', { returnObjects: true }) as string[],
    },
    {
      title: t('about.missionVision.values.title'),
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
      description: t('about.missionVision.values.description'),
      highlights: t('about.missionVision.values.highlights', { returnObjects: true }) as string[],
    },
  ];

  return (
    <section className="child_container ">
      <div className=" mx-auto text-center mb-12">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="subheading font-semibold mb-8"
        >
          {t('about.missionVision.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="minicontent  mx-auto"
        >
          {t('about.missionVision.subtitle')}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}

          >
            <Card className="relative overflow-hidden p-6 shadow-lg hover:shadow-xl border-none h-full flex flex-col">
              {/* Diagonal accent using clip-path */}

              <CardContent className="relative z-10 flex flex-col gap-3 h-full">
                <div className="flex items-center gap-2 mb-2">{item.icon}</div>
                <h3 className="subheading3 font-base">{item.title}</h3>
                <p className="minicontent flex-1">{item.description}</p>

                <ul className="mt-2 flex flex-wrap gap-2">
                  {item.highlights.map((highlight, i) => (
                    <li key={i} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MissionVisionSection;
