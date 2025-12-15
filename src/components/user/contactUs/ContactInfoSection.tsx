import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const ContactInfoBar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full bg-gray-50 py-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-start">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
              <MapPin className="text-white" size={24} />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">
              {t('contact.info.address')}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('contact.info.addressValue')}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-start">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
              <Phone className="text-white" size={24} />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">
              {t('contact.info.phone')}
            </h4>
            <p className="text-gray-600 text-sm">
              {t('contact.info.phoneValue')}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-start">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
              <Mail className="text-white" size={24} />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">
              {t('contact.info.email')}
            </h4>
            <p className="text-gray-600 text-sm">
              {t('contact.info.emailValue')}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-start">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
              <Clock className="text-white" size={24} />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">
              {t('contact.info.hours')}
            </h4>
            <p className="text-gray-600 text-sm">
              {t('contact.info.hoursValue')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoBar;
