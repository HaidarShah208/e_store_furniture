import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { clearCart } from '../../../redux/slices/cartSlice';
import { formatPrice } from '../../../utils/formatPrice';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProductCard from '@/components/user/productCard/ProductCard';

export default function AddToCart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { t } = useTranslation();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping for now
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container px-4 py-20 text-center mx-auto">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-gray-400" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">{t('cart.emptyTitle')}</h1>
        <p className="text-gray-500 mb-8">{t('cart.emptySubtitle')}</p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white shadow hover:bg-blue-600/90 h-10 px-8"
        >
          {t('cart.startShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t('cart.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">{t('cart.items', { count: cartItems.length })}</h2>
              <button 
                onClick={() => dispatch(clearCart())} 
                className="text-sm text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1 rounded transition-colors"
              >
                {t('cart.clear')}
              </button>
            </div>
            <div className="h-px bg-gray-200 mb-6" />
            <div className="flex flex-col">
              {cartItems.map((item) => (
                <ProductCard 
                  key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} 
                  product={item} 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h2 className="font-semibold text-lg mb-6">{t('cart.orderSummary')}</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">{t('cart.subtotal')}</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('cart.shipping')}</span>
                <span className="font-medium">{shipping === 0 ? t('cart.shippingFree') : formatPrice(shipping)}</span>
              </div>
              <div className="h-px bg-gray-200" />
              <div className="flex justify-between text-lg font-bold">
                <span>{t('cart.total')}</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button className="w-full h-12 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors mb-4">
              {t('cart.checkout')}
            </button>
            
            <div className="text-center">
              <Link to="/" className="text-sm text-gray-500 hover:text-blue-600 flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" /> {t('cart.continue')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
