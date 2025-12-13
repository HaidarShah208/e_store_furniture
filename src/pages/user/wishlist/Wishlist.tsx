import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { removeFromWishlist, clearWishlist } from '../../../redux/slices/wishlistSlice';
import { addToCart } from '../../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Heart } from 'lucide-react';
import { formatPrice } from '../../../utils/formatPrice';
import { useTranslation } from 'react-i18next';

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
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center">
          <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold mb-4">{t('wishlist.emptyTitle')}</h2>
          <p className="text-gray-600 mb-6">
            {t('wishlist.emptySubtitle')}
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('wishlist.continueShopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('wishlist.title')}</h1>
          <p className="text-gray-600">{wishlistItems.length} {wishlistItems.length === 1 ? t('wishlist.item') : t('wishlist.items')}</p>
        </div>
        <button
          onClick={handleClearWishlist}
          className="text-red-600 hover:text-red-700 font-medium transition-colors"
        >
          {t('wishlist.clearWishlist')}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div key={product.id} className="group relative">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
                    }}
                  />
                  {/* Remove from Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFromWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                      {product.category}
                    </p>
                    <p className="text-xs text-gray-500">{product.finishType}</p>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="font-bold text-lg mb-3">{formatPrice(product.price)}</p>
                </Link>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {t('wishlist.addToCart')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
