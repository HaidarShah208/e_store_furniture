import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { removeFromWishlist, clearWishlist } from '../../../redux/slices/wishlistSlice';
import { addToCart } from '../../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Heart, Sparkles, Package } from 'lucide-react';
import { formatPrice } from '../../../utils/formatPrice';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Wishlist() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleClearWishlist = () => {
    if (window.confirm(t('wishlist.clearConfirm'))) {
      dispatch(clearWishlist());
    }
  };

  if (wishlistItems.length === 0) {
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
                <Heart className="h-16 w-16 text-rustic_bronze" strokeWidth={1.5} />
              </div>
              {/* Decorative sparkles */}
              <div className="absolute -top-2 -right-2 h-8 w-8 bg-linear-to-br from-clay_brown to-warm_caramel rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 h-6 w-6 bg-linear-to-br from-deep_walnut to-rustic_bronze rounded-full animate-pulse delay-150" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-dark_wood mb-4"
          >
            {t('wishlist.emptyTitle')}
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-deep_walnut/70 mb-8 text-lg"
          >
            {t('wishlist.emptySubtitle')}
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
              {t('wishlist.continueShopping')}
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
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-dark_wood mb-2 flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              {t('wishlist.title')}
            </h1>
            <p className="text-deep_walnut/70 font-medium">
              {wishlistItems.length} {wishlistItems.length === 1 ? t('wishlist.item') : t('wishlist.items')}
            </p>
          </div>
          <button
            onClick={handleClearWishlist}
            className="text-sm font-semibold text-red-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500 hover:shadow-lg"
          >
            {t('wishlist.clearWishlist')}
          </button>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product, index) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-warm_caramel/30 hover:border-warm_caramel/60 hover:-translate-y-2 hover:scale-[1.02]">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-linear-to-br from-ivory_sand to-soft_latte">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
                      }}
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Remove from Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFromWishlist(product.id);
                      }}
                      className="absolute top-3 right-3 h-9 w-9 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-md shadow-lg hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-300 z-10"
                      title="Remove from wishlist"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {/* Wishlist Badge */}
                    <div className="absolute top-3 left-3 bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <Heart className="h-3 w-3 fill-current" />
                      Saved
                    </div>
                  </div>
                </Link>

                <div className="p-5">
                  <Link to={`/product/${product.id}`}>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs text-rustic_bronze font-semibold uppercase tracking-wider">
                        {product.category}
                      </p>
                      <span className="text-xs px-2 py-1 bg-linear-to-r from-clay_brown to-rustic_bronze text-white rounded-md font-medium shadow-sm">
                        {product.finishType}
                      </span>
                    </div>
                    <h3 className="font-bold text-dark_wood text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-deep_walnut group-hover:to-rustic_bronze transition-all duration-300 line-clamp-2 leading-tight">
                      {product.title}
                    </h3>
                    <p className="font-bold text-deep_walnut text-xl mb-3">
                      {formatPrice(product.price)}
                    </p>
                  </Link>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-linear-to-r from-rustic_bronze to-clay_brown text-white py-2.5 px-4 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-semibold hover:scale-105 hover:from-rustic_bronze/90 hover:to-clay_brown/90"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {t('wishlist.addToCart')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
