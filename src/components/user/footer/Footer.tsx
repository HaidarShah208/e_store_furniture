import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AtSign,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import Logo from '@/assets/Logo.png'
const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      alert(`${t('footer.subscribeSuccess')}: ${email}`);
      setEmail('');
    }
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com', color: 'hover:text-blue-300' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com', color: 'hover:text-pink-400' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com', color: 'hover:text-sky-400' },
  ];

  return (
<footer className="relative w-full bg-primary1 overflow-hidden">
  <div className=" w-full overflow-hidden rotate-0">


<svg width="100%" height="100px" viewBox="0 380 1440 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
  <path d="M0 430 C300 380 600 480 900 420 C1150 380 1300 450 1440 430 V540 H0 Z" fill="#DDB892"/>
  <path d="M0 480 C350 540 700 450 1050 520 C1250 560 1350 520 1440 540 V540 H0 Z" fill="#34130f"/>
</svg>



  </div>

  {/* Footer Content */}
  <div className=" w-full  bg-primary5 mx-auto child_bars pb-6">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          
          {/* Left: Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              
              <img src={Logo} alt={t('footer.logoAlt')} className="w-24" />
            
            
            <p className="text-primary2 leading-relaxed font-seraphine">
              {t('footer.companyDescription')}
            </p>
</div>
            <div className="space-y-4 font-seraphine">
              <a href="alhi7896542@gmail.com" className="flex items-center gap-3 text-primary2 hover:text-primary1  transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-primary4 flex items-center justify-center group-hover:bg-primary4/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>alhi7896542@gmail.com</span>
              </a>
              
              <a href="tel:+923354342880" className="flex items-center gap-3 text-primary2 hover:text-primary1 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-primary4 flex items-center justify-center group-hover:bg-primary4/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+92 335 4342880</span>
              </a>
              
              <div className="flex items-center gap-3 text-primary2">
                <div className="w-10 h-10 rounded-lg bg-primary4 flex items-center justify-center group-hover:bg-primary4/20 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>{t('footer.location')}</span>
              </div>
            </div>
          </motion.div>

          {/* Middle: Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary4/20  ">
              <span className="minicontent font-seraphine text-primary2 tracking-wider">{t('footer.followUs')}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-3 p-4 bg-primary4/50 backdrop-blur-sm rounded-xl border border-primary4/50 hover:border-primary4/50 ${social.color} transition-all group hover:-translate-y-1`}
                >
                  <div className="w-10 h-10 rounded-lg text-primary5 bg-linear-to-br from-primary3 to-primary2 flex items-center justify-center group-hover:from-primary2/20 group-hover:to-primary2/20 group-hover:text-primary1 transition-all">
                    <social.icon className="w-5 h-5 " />
                  </div>
                  <span className="font-medium text-primary2 group-hover:text-primary1 font-seraphine">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary4/20 backdrop-blur-sm  ">
              <span className="minicontent  font-seraphine text-primary2 tracking-wider">{t('footer.stayUpdated')}</span>
            </div>

            <div>
              <h3 className="subheading2 font-petit mb-3 text-primary1">
                {t('footer.newsletterTitle')}
              </h3>
              <p className="text-primary2 font-seraphine mb-6">
                {t('footer.newsletterDescription')}
              </p>

              <div className="relative group">
                <div className={`absolute inset-0 bg-linear-to-r from-primary1 to-primary2 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
                
                <div className="relative flex items-center bg-primary4/50 backdrop-blur-sm border border-primary5 rounded-xl overflow-hidden focus-within:border-priamry3/50 transition-colors">
                  <div className="pl-4 text-primary2">
                    <AtSign className="w-5 h-5" />
                  </div>
                  
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                    placeholder={t('footer.emailPlaceholder')}
                    className="flex-1 px-4 py-4 bg-transparent text-white placeholder-primary2 focus:outline-none"
                  />
                  
                  <button
                    onClick={handleSubscribe}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="px-6 py-5 bg-linear-to-r from-primary4 to-primary5 hover:from-primary2/80 hover:to-primary2/80 transition-all duration-500 group/btn"
                  >
                    <motion.div
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-primary1 font-seraphine"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-primary2">
              © 2025 {t('footer.brandName')}. {t('footer.rights')}
            </p>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-primary2 hover:text-primary1 transition-colors">{t('footer.privacyPolicy')}</a>
              <a href="#" className="text-primary2 hover:text-primary1 transition-colors">{t('footer.termsOfService')}</a>
              <a href="#" className="text-primary2 hover:text-primary1 transition-colors">{t('footer.cookies')}</a>
            </div>
            
            <p className="text-primary2">
              {t('footer.developedBy')} {t('footer.brandName')}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
