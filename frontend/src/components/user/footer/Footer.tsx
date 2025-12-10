import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">{t('brand')}</h3>
          <p className="text-sm leading-relaxed">
            {t('footer.description')}
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">{t('footer.shop')}</h4>
          <ul className="space-y-2 text-sm">
            <li>{t('footer.shopLinks.readymade')}</li>
            <li>{t('footer.shopLinks.unpolished')}</li>
            <li>{t('footer.shopLinks.livingRoom')}</li>
            <li>{t('footer.shopLinks.bedroom')}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">{t('footer.support')}</h4>
          <ul className="space-y-2 text-sm">
            <li>{t('footer.supportLinks.contact')}</li>
            <li>{t('footer.supportLinks.shipping')}</li>
            <li>{t('footer.supportLinks.returns')}</li>
            <li>{t('footer.supportLinks.faq')}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">{t('footer.newsletter')}</h4>
          <p className="text-sm mb-4">{t('footer.newsletterCta')}</p>
          <input 
            type="email" 
            placeholder={t('footer.emailPlaceholder')} 
            className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {t('brand')} {t('footer.rights')}</p>
      </div>
    </footer>
  );
}
