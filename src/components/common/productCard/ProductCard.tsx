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
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-rustic_bronze/30 hover:border-rustic_bronze group-hover:scale-[1.02] relative">
        {/* Glowing effect on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-linear-to-br from-rustic_bronze/10 via-transparent to-clay_brown/10 blur-xl" />
        
        <div className="relative aspect-square overflow-hidden bg-linear-to-br from-ivory_sand to-soft_latte">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
            }}
          />
          
          {/* Enhanced overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {product.isFeatured && (
            <span className="absolute top-4 left-4 bg-linear-to-r from-deep_walnut to-dark_wood text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
              {t('product.featuredBadge')}
            </span>
          )}
          
          <div className="absolute top-4 right-4 flex flex-col gap-3">
            <button 
              onClick={handleToggleWishlist} 
              className={`h-9 w-9 flex items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all duration-500 hover:scale-110 ${
                isInWishlist 
                  ? 'bg-red-500 text-white hover:bg-red-600 opacity-100 translate-x-0 ring-2 ring-red-300' 
                  : 'bg-white/95 text-gray-700 hover:bg-red-500 hover:text-white opacity-0 translate-x-12 group-hover:opacity-100 group-hover:translate-x-0'
              } group-hover:delay-75`}
              title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              style={{
                transitionProperty: 'all',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Heart className={`h-4 w-4 transition-all ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
            
            <Link
              to={`/product/${product.id}`}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-md shadow-lg hover:bg-linear-to-r hover:from-clay_brown hover:to-rustic_bronze hover:text-white transition-all duration-500 opacity-0 translate-x-12 group-hover:opacity-100 group-hover:translate-x-0 group-hover:delay-150 hover:scale-110"
              title="Quick view"
              onClick={(e) => e.stopPropagation()}
              style={{
                transitionProperty: 'all',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Eye className="h-4 w-4" />
            </Link>
            
            <button 
              onClick={handleAddToCart} 
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-md shadow-lg hover:bg-linear-to-r hover:from-deep_walnut hover:to-dark_wood hover:text-white transition-all duration-500 opacity-0 translate-x-12 group-hover:opacity-100 group-hover:translate-x-0 group-hover:delay-225 hover:scale-110"
              title="Add to cart"
              style={{
                transitionProperty: 'all',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>

        </div>
        
        <div className="p-5 relative z-10">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs text-rustic_bronze font-semibold uppercase tracking-wider">{product.category}</p>
            <span className="text-xs px-2 py-1 bg-linear-to-r from-clay_brown to-rustic_bronze text-white rounded-md font-medium shadow-sm group-hover:shadow-md transition-shadow duration-300">
              {product.finishType}
            </span>
          </div>
          <h3 className="font-bold text-dark_wood text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-deep_walnut group-hover:to-dark_wood transition-all duration-300 line-clamp-2 leading-tight">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="font-bold text-deep_walnut text-xl group-hover:scale-105 transition-transform duration-300">
              {formatPrice(product.price)}
            </p>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
              <div className="flex gap-1">
                {product.colors.slice(0, 3).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm hover:scale-125 transition-transform duration-200 cursor-pointer"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 3}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
