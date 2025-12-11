import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../../../types/types';
import { formatPrice } from '../../../utils/formatPrice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addToCart } from '../../../redux/slices/cartSlice';
import { toggleWishlist } from '../../../redux/slices/wishlistSlice';
import { useTranslation } from 'react-i18next';

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
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
          
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handleToggleWishlist} 
              className={`h-9 w-9 flex items-center justify-center rounded-full shadow-lg transition-colors ${
                isInWishlist 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
              title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
            
            <Link
              to={`/product/${product.id}`}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
              title="Quick view"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="h-4 w-4" />
            </Link>
          </div>

          {/* Add to Cart Button - Bottom Right */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handleAddToCart} 
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
              title="Add to cart"
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
