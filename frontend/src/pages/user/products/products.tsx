import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchProducts } from '../../../redux/slices/productsSlice';
import { addToCart } from '../../../redux/slices/cartSlice';
import { formatPrice } from '../../../utils/formatPrice';
import { Check, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Products() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector((state) => state.products);
  const { t } = useTranslation();
  
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    if (product) {
      if (product.colors.length > 0) setSelectedColor(product.colors[0]);
      if (product.sizes.length > 0) setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({
      ...product,
      quantity: 1,
      selectedColor,
      selectedSize
    }));
  };

  if (status === 'loading') return <div className="container py-20 text-center mx-auto">{t('product.loading')}</div>;
  if (!product) return <div className="container py-20 text-center mx-auto">{t('product.notFound')}</div>;

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
            }}
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex gap-2 mb-2">
              <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-600 uppercase tracking-wider">{product.category}</span>
              <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded uppercase tracking-wider">{product.finishType}</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-500">{t('product.reviews')}</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">{formatPrice(product.price)}</p>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="h-px bg-gray-200 mb-8" />

          <div className="space-y-6 mb-8">
            {/* Colors */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">{t('product.color')}</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full border text-sm transition-all ${
                        selectedColor === color 
                          ? 'border-blue-600 bg-blue-600 text-white' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">{t('product.size')}</h3>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full border text-sm transition-all ${
                        selectedSize === size 
                          ? 'border-blue-600 bg-blue-600 text-white' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto">
            <button 
              className="w-full md:w-auto min-w-[200px] h-12 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleAddToCart}
            >
              {t('product.addToCart')}
            </button>
            <p className="mt-4 text-sm text-gray-500 flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" /> {t('product.inStock')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
