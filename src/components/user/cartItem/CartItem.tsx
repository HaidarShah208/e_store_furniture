import { X, Heart, Plus, Minus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { removeFromCart, updateQuantity } from '../../../redux/slices/cartSlice';
import { toggleWishlist } from '../../../redux/slices/wishlistSlice';
import { CartItem as CartItemType } from '../../../types/types';
import { formatPrice } from '../../../utils/formatPrice';
import { useTranslation } from 'react-i18next';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((wishItem) => wishItem.id === item.id);

  const handleRemove = () => {
    dispatch(removeFromCart({ 
      id: item.id, 
      selectedColor: item.selectedColor, 
      selectedSize: item.selectedSize 
    }));
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(item));
  };

  const handleIncrement = () => {
    dispatch(updateQuantity({ 
      id: item.id, 
      quantity: item.quantity + 1,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize
    }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ 
        id: item.id, 
        quantity: item.quantity - 1,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize
      }));
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors shrink-0"
        title={t('cart.removeFromCart')}
      >
        <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
      </button>

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors shrink-0"
        title={isInWishlist ? t('cart.removeFromWishlist') : t('cart.addToWishlist')}
      >
        <Heart 
          className={`w-5 h-5 transition-colors ${
            isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'
          }`} 
        />
      </button>

      {/* Product Image */}
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=Product';
          }}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
        <div className="flex gap-2 mt-1 text-sm text-gray-500">
          {item.selectedColor && (
            <span>{item.selectedColor}</span>
          )}
          {item.selectedSize && (
            <>
              {item.selectedColor && <span>•</span>}
              <span>{item.selectedSize}</span>
            </>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleDecrement}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          disabled={item.quantity <= 1}
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
        <button
          onClick={handleIncrement}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Price */}
      <div className="text-right shrink-0 min-w-[80px]">
        <p className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
        {item.quantity > 1 && (
          <p className="text-xs text-gray-500">{formatPrice(item.price)} {t('cart.each')}</p>
        )}
      </div>
    </div>
  );
}
