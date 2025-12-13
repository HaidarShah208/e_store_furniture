import { DiscountCardProps } from '@/types/types';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';



export default function DiscountCard({
  title,
  discount,
  description,
  image,
  bgColor,
  link,
}: DiscountCardProps) {
  const { t } = useTranslation();
  return (
    <Link
      to={link}
      className={`${bgColor} rounded-2xl overflow-hidden flex flex-col md:flex-row items-center gap-4 p-6 hover:shadow-lg transition-shadow group`}
    >
      <div className="w-full md:w-40 h-40 md:h-32 shrink-0 rounded-lg overflow-hidden bg-white">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/300x200?text=Furniture';
          }}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between h-full min-w-0">
        <div>
          <p className="font-bold text-gray-800 text-sm mb-1">{title}</p>
          <p className="font-bold text-gray-800 text-lg mb-2">{discount}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
        <Button variant="secondary" size="sm" className="mt-4 bg-white text-gray-800 font-medium hover:bg-gray-50 w-fit">
          {t('home.discounts.browseNow')}
        </Button>
      </div>
    </Link>
  );
}
