import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../../types/product';
import { formatPrice } from '../../../utils/formatPrice';
import { useAppDispatch } from '../../../redux/hooks';
import { addToCart } from '../../../redux/slices/cartSlice';
import { useTranslation } from 'react-i18next';

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
            }}
          />
          {product.isFeatured && (
            <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1 rounded">
            {t('product.featuredBadge')}
            </span>
          )}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handleAddToCart} 
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{product.category}</p>
            <p className="text-xs text-gray-500">{product.finishType}</p>
          </div>
          <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{product.title}</h3>
          <p className="font-bold text-lg">{formatPrice(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}
