import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchProducts } from '../../../redux/slices/productsSlice';
import { addToCart } from '../../../redux/slices/cartSlice';
import { formatPrice } from '../../../utils/formatPrice';
import { Check, Star, Ruler, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SizeGuideModal from '../../../components/user/sizeGuideModal/SizeGuideModal';
import ProductTabs from '../../../components/common/productTabs/ProductTabs';
import Benefits from '../../../components/user/benefits/Benefits';
import { Button } from '@/components/ui/button';

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
      <div className="pt-12 mx-auto">
        <div className="container px-14 grid grid-cols-1 md:grid-cols-2 gap-12">
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
              {selectedImageIndex > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(prev => Math.max(0, prev - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}
              {selectedImageIndex < productImages.length - 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(prev => Math.min(productImages.length - 1, prev + 1));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              )}
            </div>

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
              {product.colors.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">{t('product.color')}</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color:any) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedColor(color)}
                        className={selectedColor === color ? "bg-blue-600 text-white" : ""}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">{t('product.size')}</h3>
                  <div className="flex gap-3">
                    {product.sizes.map((size:any) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                        className={selectedSize === size ? "bg-blue-600 text-white" : ""}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-auto space-y-4">
              <Button 
                className="w-full md:w-auto min-w-[200px] h-12 bg-blue-600 text-white font-medium hover:bg-blue-700"
                size="lg"
                onClick={handleAddToCart}
              >
                {t('product.addToCart')}
              </Button>
              
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> {t('product.inStock')}
              </p>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSizeGuideOpen(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 w-fit px-0"
              >
                <Ruler className="w-4 h-4" />
                <span>Size Guide</span>
              </Button>
            </div>
          </div>
        </div>

          <ProductTabs 
            description={product.description}
            category={product.category}
            finishType={product.finishType}
          />
          <Benefits />
        </div>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        product={product}
      />
    </>
  );
}
