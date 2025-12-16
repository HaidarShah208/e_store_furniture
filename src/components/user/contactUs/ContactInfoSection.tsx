import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const ContactInfoBar: React.FC = () => {
  const { t } = useTranslation();
  
  const contactInfo = [
    {
      icon: <MapPin className="text-white" size={24} />,
      title: t('contact.info.address') || 'Address',
      value: t('contact.info.addressValue') || '123 Furniture Street, Design City',
      gradient: 'from-rustic_bronze to-clay_brown',
      glowColor: 'from-rustic_bronze/20 to-clay_brown/10',
    },
    {
      icon: <Phone className="text-white" size={24} />,
      title: t('contact.info.phone') || 'Phone',
      value: t('contact.info.phoneValue') || '+1 234 567 8900',
      gradient: 'from-clay_brown to-warm_caramel',
      glowColor: 'from-clay_brown/20 to-warm_caramel/10',
    },
    {
      icon: <Mail className="text-white" size={24} />,
      title: t('contact.info.email') || 'Email',
      value: t('contact.info.emailValue') || 'contact@furniture.com',
      gradient: 'from-deep_walnut to-rustic_bronze',
      glowColor: 'from-deep_walnut/20 to-rustic_bronze/10',
    },
    {
      icon: <Clock className="text-white" size={24} />,
      title: t('contact.info.hours') || 'Business Hours',
      value: t('contact.info.hoursValue') || 'Mon-Sat: 9AM - 6PM',
      gradient: 'from-warm_caramel to-soft_latte',
      glowColor: 'from-warm_caramel/20 to-soft_latte/10',
    },
  ];

  return (
    <section className="w-full bg-linear-to-b from-ivory_sand to-soft_latte/50 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
          >
            {/* Hover glow effect */}
            <div className={`absolute -inset-1 bg-linear-to-br ${item.glowColor} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
            
            {/* Card */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl p-6 transition-all duration-500 group-hover:-translate-y-2 border border-warm_caramel/20">
              <div className="flex flex-col items-start">
                {/* Icon with gradient background */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-14 h-14 bg-linear-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-all duration-300`}
                >
                  {item.icon}
                </motion.div>
                
                {/* Title */}
                <h4 className="font-bold text-dark_wood text-lg mb-2">
                  {item.title}
                </h4>
                
                {/* Value */}
                <p className="text-deep_walnut/80 text-sm leading-relaxed">
                  {item.value}
                </p>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-bl from-warm_caramel/15 to-transparent rounded-tr-3xl" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ContactInfoBar;
