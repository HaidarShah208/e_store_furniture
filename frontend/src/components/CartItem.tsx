import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '../types/cart';
import { formatPrice } from '../utils/formatPrice';
import { useAppDispatch } from '../redux/hooks';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';

export default function CartItem({ item }: { item: CartItemType }) {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart({ 
      id: item.id, 
      selectedColor: item.selectedColor, 
      selectedSize: item.selectedSize 
    }));
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ 
      id: item.id, 
      quantity: newQuantity,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize
    }));
  };

  return (
    <div className="flex gap-4 py-6 border-b">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
          }}
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-base font-medium">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{item.category} • {item.finishType}</p>
            {(item.selectedColor || item.selectedSize) && (
              <div className="mt-1 text-sm text-gray-500">
                {item.selectedColor && <span className="mr-2">Color: {item.selectedColor}</span>}
                {item.selectedSize && <span>Size: {item.selectedSize}</span>}
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-base font-medium">{formatPrice(item.price * item.quantity)}</p>
            <p className="text-sm text-gray-500">{formatPrice(item.price)} each</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-md">
            <button 
              className="h-8 w-8 flex items-center justify-center hover:bg-gray-100"
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button 
              className="h-8 w-8 flex items-center justify-center hover:bg-gray-100"
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <button 
            className="flex items-center text-sm text-red-500 hover:text-red-600"
            onClick={handleRemove}
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
