import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";

const MapSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="w-full isolate_container bg-linear-to-b from-ivory_sand to-soft_latte/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark_wood/10 text-dark_wood text-sm font-semi-bold rounded-full border border-dark_wood/20 mb-4">
            <MapPin className="w-4 h-4" />
            {t('contact.map.badge') || '📍 Find Us'}
          </div>
          <h2 className="subheading2 font-bold text-dark_wood mb-3">
            {t('contact.map.title') || 'Visit Our Showroom'}
          </h2>
          <p className="content text-deep_walnut/70">
            {t('contact.map.description') || 'Come see our furniture collection in person'}
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative group"
        >
          {/* Glow effect on hover */}
          <div className="absolute -inset-1 bg-linear-to-br from-rustic_bronze/20 to-clay_brown/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-warm_caramel/30 h-[450px]">
            <iframe
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d490.7199492054369!2d74.28737709805701!3d31.60951666987198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1755665098111!5m2!1sen!2s"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
