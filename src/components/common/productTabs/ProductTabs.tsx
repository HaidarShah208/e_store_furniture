import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ProductTabsProps {
  description: string;
  category?: string;
  finishType?: string;
  material?: string;
}

export default function ProductTabs({ description, category, finishType, material }: ProductTabsProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'description' | 'additionalInfo' | 'reviews'>('description');

  const tabs = [
    { id: 'description' as const, label: t('product.tabs.description') },
    { id: 'additionalInfo' as const, label: t('product.tabs.additionalInfo') },
    { id: 'reviews' as const, label: t('product.tabs.reviews') }
  ];

  return (
    <div className="w-full isolate_bars paddingtop paddingbottom ">
      <div className="border-b flex items-center justify-center border-gray-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-xs font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="py-8">
        {activeTab === 'description' && (
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>{description}</p>
            <p>
              Risus sed vulputate odio ut enim blandit. Ut lectus arcu bibendum at varius vel pharetra vel. 
              Ut ornare lectus sit amet est. Cras adipiscing enim eu turpis. Fermentum posuere urna nec 
              tincidunt praesent semper feugiat. Dolor sit amet consectetur adipiscing elit ut aliquam. 
              Massa sapien faucibus et molestie ac feugiat sed. Facilisis mauris sit amet massa vitae tortor 
              condimentum. Vulputate sapien nec sagittis aliquam malesuada.
            </p>
          </div>
        )}

        {activeTab === 'additionalInfo' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">{t('product.additionalInfo.category')}</span>
              <span className="text-gray-800">{category || t('product.additionalInfo.na')}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">{t('product.additionalInfo.finishType')}</span>
              <span className="text-gray-800">{finishType || t('product.additionalInfo.na')}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-200">
              <span className="text-gray-600 font-medium">{t('product.additionalInfo.material')}</span>
              <span className="text-gray-800">{material || 'Wood, Fabric'}</span>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">{t('product.reviews.noReviews')}</p>
            <p className="text-sm">{t('product.reviews.beFirst')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
