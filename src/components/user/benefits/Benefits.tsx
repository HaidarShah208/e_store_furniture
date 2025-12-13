import { CreditCard, Truck, Gift, Headphones } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Benefits() {
  const { t } = useTranslation();
  const benefits: Benefit[] = [
    {
      icon: <CreditCard className="w-7 h-7" />,
      title: t('product.benefits.securePayments.title'),
      description: t('product.benefits.securePayments.description')
    },
    {
      icon: <Truck className="w-7 h-7" />,
      title: t('product.benefits.freeShipping.title'),
      description: t('product.benefits.freeShipping.description')
    },
    {
      icon: <Gift className="w-7 h-7" />,
      title: t('product.benefits.giftsSales.title'),
      description: t('product.benefits.giftsSales.description')
    },
    {
      icon: <Headphones className="w-7 h-7" />,
      title: t('product.benefits.support247.title'),
      description: t('product.benefits.support247.description')
    }
  ];

  return (
    <div className="border-t isolate_bars bg-gray-200 border-gray-200 child">
      <div className="grid px-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="mb-2 text-gray-700">
              {benefit.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {benefit.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
