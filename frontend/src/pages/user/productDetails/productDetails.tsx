import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchProducts } from '../../../redux/slices/productsSlice';
import { addToCart } from '../../../redux/slices/cartSlice';
import { formatPrice } from '../../../utils/formatPrice';
import { Check, Star, X, Ruler } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Reusable Size Guide Modal Component
function SizeGuideModal({ 
  isOpen, 
  onClose, 
  product 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  product: { title: string; type: string; sizes: string[] } | null;
}) {
  if (!isOpen || !product) return null;

  // Get dimensions based on product type and size
  const getDimensions = (productType: string, size: string) => {
    const dimensions: Record<string, Record<string, { width: string; height: string; depth?: string }>> = {
      'Chair': {
        'Standard': { width: '24"', height: '32"', depth: '22"' },
        'Large': { width: '26"', height: '34"', depth: '24"' }
      },
      'Sofa': {
        '2-Seater': { width: '60"', height: '32"', depth: '36"' },
        '3-Seater': { width: '84"', height: '32"', depth: '36"' },
        '4-Seater': { width: '108"', height: '32"', depth: '36"' }
      },
      'Table': {
        '4-Person': { width: '48"', height: '30"', depth: '30"' },
        '6-Person': { width: '72"', height: '30"', depth: '36"' },
        '8-Person': { width: '96"', height: '30"', depth: '42"' }
      },
      'Bed': {
        'Queen': { width: '60"', height: '80"', depth: '20"' },
        'King': { width: '76"', height: '80"', depth: '20"' },
        'Full': { width: '54"', height: '75"', depth: '20"' }
      },
      'Storage': {
        '3-Tier': { width: '30"', height: '60"', depth: '12"' },
        '5-Tier': { width: '30"', height: '72"', depth: '12"' }
      }
    };

    return dimensions[productType]?.[size] || { width: 'N/A', height: 'N/A', depth: 'N/A' };
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-800">Size Guide</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
            <p className="text-gray-600">
              Please refer to the dimensions below to ensure this product fits your space perfectly.
            </p>
          </div>

          <div className="space-y-6">
            {product.sizes.length > 0 ? (
              product.sizes.map((size) => {
                const dims = getDimensions(product.type, size);
                return (
                  <div key={size} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">{size}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Width</p>
                        <p className="text-lg font-semibold text-gray-800">{dims.width}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Height</p>
                        <p className="text-lg font-semibold text-gray-800">{dims.height}</p>
                      </div>
                      {dims.depth && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Depth</p>
                          <p className="text-lg font-semibold text-gray-800">{dims.depth}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Standard Dimensions</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Width</p>
                    <p className="text-lg font-semibold text-gray-800">Varies</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Height</p>
                    <p className="text-lg font-semibold text-gray-800">Varies</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Depth</p>
                    <p className="text-lg font-semibold text-gray-800">Varies</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> All dimensions are approximate and may vary slightly. 
              Please measure your space before purchasing to ensure a proper fit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector((state) => state.products);
  const { t } = useTranslation();
  
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  
  const imageRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

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

  // Generate multiple product images (using the same image with variations for demo)
  const productImages = product ? [
    product.image,
    product.image + '?w=800&q=80&auto=format&fit=crop&crop=center',
    product.image + '?w=800&q=80&auto=format&fit=crop&crop=left',
    product.image + '?w=800&q=80&auto=format&fit=crop&crop=right',
    product.image + '?w=800&q=80&auto=format&fit=crop&crop=top'
  ].slice(0, 5) : [];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

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
    <>
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section with Zoom */}
          <div className="space-y-4">
            <div
              ref={imageRef}
              className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={productImages[selectedImageIndex]}
                alt={product.title}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={{
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
                }}
              />
              {/* Navigation Arrows */}
              {selectedImageIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(prev => Math.max(0, prev - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              {selectedImageIndex < productImages.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(prev => Math.min(productImages.length - 1, prev + 1));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? 'border-blue-600 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=View';
                    }}
                  />
                </button>
              ))}
            </div>
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

            <div className="mt-auto space-y-4">
              <button 
                className="w-full md:w-auto min-w-[200px] h-12 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleAddToCart}
              >
                {t('product.addToCart')}
              </button>
              
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> {t('product.inStock')}
              </p>

              {/* Size Guide Link */}
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <Ruler className="w-4 h-4" />
                <span>Size Guide</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        product={product}
      />
    </>
  );
}
