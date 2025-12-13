import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const ContactInfoBar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full bg-indigo-100 py-10 px-6 md:px-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-800">
        <div className="flex items-start gap-3">
          <MapPin className="text-indigo-600" />
          <div>
            <h4 className="font-semibold">{t('contact.info.address')}</h4>
            <p>{t('contact.info.addressValue')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="text-indigo-600" />
          <div>
            <h4 className="font-semibold">{t('contact.info.phone')}</h4>
            <p>{t('contact.info.phoneValue')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="text-indigo-600" />
          <div>
            <h4 className="font-semibold">{t('contact.info.email')}</h4>
            <p>{t('contact.info.emailValue')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="text-indigo-600" />
          <div>
            <h4 className="font-semibold">{t('contact.info.hours')}</h4>
            <p>{t('contact.info.hoursValue')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoBar;
