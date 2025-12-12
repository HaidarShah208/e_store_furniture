import { CreditCard, Truck, Gift, Headphones } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Benefits() {
  const benefits: Benefit[] = [
    {
      icon: <CreditCard className="w-7 h-7" />,
      title: 'Secure Payments',
      description: 'Tellus gravida ipsum sit facilisis tempus sit et aliquam esteem.'
    },
    {
      icon: <Truck className="w-7 h-7" />,
      title: 'Free Shipping',
      description: 'Non pulvinar senean ultrices lectus vitae imperdiet vulputate a eu.'
    },
    {
      icon: <Gift className="w-7 h-7" />,
      title: 'Gifts & Sales',
      description: 'Aliquet ullamcorper leo mi vel sit pretium euismod eget libero.'
    },
    {
      icon: <Headphones className="w-7 h-7" />,
      title: '24/7 Support',
      description: 'Nullam lacus vestibulum arcu ac urna pellentesque volutate quis.'
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
