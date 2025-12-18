import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { clearCart } from '../../../redux/slices/cartSlice';
import { formatPrice } from '../../../utils/formatPrice';
import { ArrowLeft, ShoppingBag, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CartItem from '@/components/user/cartItem/CartItem';
import { motion } from 'framer-motion';

export default function AddToCart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { t } = useTranslation();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping for now
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen w-full isolate_bars bg-linear-to-b from-ivory_sand via-soft_latte/50 to-white flex items-center justify-center px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg"
        >
          {/* Animated Icon Container */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="h-32 w-32 bg-linear-to-br from-warm_caramel/20 via-soft_latte/40 to-ivory_sand rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                <ShoppingBag className="h-16 w-16 text-rustic_bronze" strokeWidth={1.5} />
              </div>
              {/* Decorative circles */}
              <div className="absolute -top-2 -right-2 h-8 w-8 bg-linear-to-br from-clay_brown to-warm_caramel rounded-full animate-pulse" />
              <div className="absolute -bottom-2 -left-2 h-6 w-6 bg-linear-to-br from-deep_walnut to-rustic_bronze rounded-full animate-pulse delay-150" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-dark_wood mb-4"
          >
            {t('cart.emptyTitle')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-deep_walnut/70 mb-8 text-lg"
          >
            {t('cart.emptySubtitle')}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center justify-center gap-2 rounded-xl text-base font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay_brown/50 bg-linear-to-r from-rustic_bronze to-clay_brown text-white shadow-lg hover:shadow-xl hover:scale-105 h-12 px-8"
            >
              <Package className="w-5 h-5" />
              {t('cart.startShopping')}
            </Link>
          </motion.div>

          {/* Decorative elements */}
          <div className="mt-12 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rustic_bronze/30 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-clay_brown/30 animate-pulse delay-75" />
            <div className="w-2 h-2 rounded-full bg-warm_caramel/30 animate-pulse delay-150" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full isolate_bars bg-linear-to-b from-ivory_sand via-soft_latte/50 to-white px-4 py-12">
      <div className="mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-dark_wood mb-8"
        >
          {t('cart.shoppingBag')}
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-warm_caramel/30 shadow-lg">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-semibold text-xl text-dark_wood flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-rustic_bronze" />
                    {cartItems.length} {cartItems.length === 1 ? t('cart.item') : t('cart.itemsPlural')}
                  </h2>
                  <button 
                    onClick={() => dispatch(clearCart())} 
                    className="text-sm font-semibold text-red-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500 hover:shadow-lg"
                  >
                    {t('cart.clearAll')}
                  </button>
                </div>
                
                {/* Cart Items List */}
                <div className="space-y-0">
                  {cartItems.map((item) => (
                    <CartItem 
                      key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} 
                      item={item} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-linear-to-br from-white/90 to-ivory_sand/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 sticky top-24 border-2 border-warm_caramel/40 shadow-xl">
              <h2 className="font-bold text-xl text-dark_wood mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-rustic_bronze" />
                {t('cart.orderSummary')}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-deep_walnut/70 font-medium">{t('cart.subtotal')}</span>
                  <span className="font-bold text-dark_wood text-lg">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-deep_walnut/70 font-medium">{t('cart.shipping')}</span>
                  <span className="font-semibold text-deep_walnut">
                    {shipping === 0 ? (
                      <span className="text-green-600 font-bold">{t('cart.shippingFree')}</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="h-px bg-linear-to-r from-transparent via-warm_caramel/50 to-transparent" />
                <div className="flex justify-between items-center py-3 bg-linear-to-r from-ivory_sand/50 to-soft_latte/50 -mx-4 px-4 rounded-lg">
                  <span className="text-lg font-bold text-dark_wood">{t('cart.total')}</span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-deep_walnut to-rustic_bronze">{formatPrice(total)}</span>
                </div>
              </div>

              <button className="w-full h-12 bg-linear-to-r from-rustic_bronze to-clay_brown text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 mb-4 hover:scale-105 hover:from-rustic_bronze/90 hover:to-clay_brown/90 shadow-lg">
                {t('cart.checkout')}
              </button>
              
              <div className="text-center">
                <Link to="/" className="text-sm font-medium text-deep_walnut/70 hover:text-rustic_bronze flex items-center justify-center gap-2 transition-colors duration-300 group">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" /> 
                  {t('cart.continue')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
