import { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchProducts } from '../../../redux/slices/productsSlice';
import ProductCard from '../../../components/common/productCard/ProductCard';
import ProductFilter from '../../../components/user/ProductFilter/ProductFilter';
import { useTranslation } from 'react-i18next';
import Button from '@/components/common/Button';

const categoryToProductType: Record<string, string> = {
  'chairs': 'Chair',
  'storage': 'Storage',
  'armchairs': 'Chair',
  'sofas': 'Sofa',
  'beds': 'Bed',
  'tables': 'Table',
  'decor': 'Decor'
};

// Category ID to Display Name mapping
const categoryToDisplayName: Record<string, string> = {
  'chairs': 'Chairs',
  'storage': 'Storage',
  'armchairs': 'Armchairs',
  'sofas': 'Sofas',
  'beds': 'Beds',
  'tables': 'Tables',
  'decor': 'Decor'
};

// Category images mapping
const categoryImages: Record<string, string> = {
  'chairs': 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=1200&q=80',
  'storage': 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1200&q=80',
  'armchairs': 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=1200&q=80',
  'sofas': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
  'beds': 'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=1200&q=80',
  'tables': 'https://images.unsplash.com/photo-1577140917170-285929db55cc?w=1200&q=80',
  'decor': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80'
};



type PriceRange = [number, number];

export default function ProductCategory() {
  const { type, id } = useParams<{ type?: string; id?: string }>();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector((state) => state.products);
  const { t } = useTranslation();

  const [priceRange, setPriceRange] = useState<PriceRange>([0, 1000]);
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const isProductCategoryRoute = location.pathname.includes('/product-category/');
  
  const categoryFilteredProducts = useMemo(() => {
    if (isProductCategoryRoute && id) {
      const categoryId = id.toLowerCase();
      const productType = categoryToProductType[categoryId];
      
      if (productType) {
        if (categoryId === 'armchairs') {
          return products.filter((p) => 
            p.type === 'Chair' && 
            (p.title.toLowerCase().includes('armchair') || p.title.toLowerCase().includes('arm chair'))
          );
        }
        if (categoryId === 'decor') {
          return products.filter((p) => 
            p.category.toLowerCase().includes('decor') || 
            p.type.toLowerCase().includes('decor')
          );
        }
        return products.filter((p) => p.type === productType);
      }
      return [];
    } else if (type) {
      return products.filter((p) => p.finishType === type);
    }
    return [];
  }, [products, isProductCategoryRoute, id, type]);

  const priceMinMax = useMemo(() => {
    if (categoryFilteredProducts.length === 0) return { min: 0, max: 1000 };
    const prices = categoryFilteredProducts.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [categoryFilteredProducts]);

  // Initialize price range when products load
  useEffect(() => {
    if (categoryFilteredProducts.length > 0) {
      setPriceRange([priceMinMax.min, priceMinMax.max]);
    }
  }, [categoryFilteredProducts.length, priceMinMax.min, priceMinMax.max]);

  // Get available colors from filtered products
  const availableColors = useMemo(() => {
    const colorMap = new Map<string, number>();
    categoryFilteredProducts.forEach((p) => {
      p.colors.forEach((color:any) => {
        colorMap.set(color, (colorMap.get(color) || 0) + 1);
      });
    });
    return Array.from(colorMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [categoryFilteredProducts]);

  // Apply price and color filters
  const filteredProducts = useMemo(() => {
    return categoryFilteredProducts.filter((p) => {
      const withinPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesColor = selectedColor === '' || p.colors.includes(selectedColor);
      return withinPrice && matchesColor;
    });
  }, [categoryFilteredProducts, priceRange, selectedColor]);

  const displayName = useMemo(() => {
    if (isProductCategoryRoute && id) {
      return categoryToDisplayName[id.toLowerCase()] || id;
    }
    return type ?? '';
  }, [isProductCategoryRoute, id, type]);

  const categoryId = isProductCategoryRoute && id ? id.toLowerCase() : '';
  const categoryImage = categoryId ? categoryImages[categoryId] : '';



  return (
    <div className="w-full isolate_bars bg-linear-to-b from-ivory_sand via-soft_latte/50 to-white">
      {categoryImage && (
        <div className="relative mx-auto h-64 md:h-96 lg:h-[330px] my-8 md:my-12">
          <img
            src={categoryImage}
            alt={displayName}
            className="w-full h-full object-cover rounded-4xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/1200x500?text=' + displayName;
            }}
          />
          <div className="absolute inset-0 bg-linear-to-br from-dark_wood/60 via-rustic_bronze/40 to-transparent rounded-4xl flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {displayName}
            </h1>
            <nav className="text-sm md:text-base text-ivory_sand/90">
              <Link to="/" className="hover:text-white transition-colors font-semi-bold">HOME</Link>
              <span className="mx-2">/</span>
              <Link to="/shop" className="hover:text-white transition-colors font-semi-bold">SHOP</Link>
              <span className="mx-2">/</span>
              <span className="text-white font-bold">{displayName.toUpperCase()}</span>
            </nav>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
          <p className="subheading3 paddingbottom text-dark_wood font-bold">
            {t('category.showingResults', { count: filteredProducts.length })}
          </p>
          <div className="relative">
            <select className="appearance-none bg-white/80 backdrop-blur-sm border-2 border-warm_caramel/40 rounded-lg px-4 py-2.5 pr-10 text-sm font-semi-bold text-dark_wood focus:outline-none focus:ring-2 focus:ring-clay_brown/50 focus:border-clay_brown transition-all duration-200 shadow-sm hover:shadow-md">
              <option>{t('category.sorting.default')}</option>
              <option>{t('category.sorting.priceLowHigh')}</option>
              <option>{t('category.sorting.priceHighLow')}</option>
              <option>{t('category.sorting.nameAZ')}</option>
              <option>{t('category.sorting.nameZA')}</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-rustic_bronze pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <ProductFilter
            priceRange={priceRange}
            priceMinMax={priceMinMax}
            onPriceChange={setPriceRange}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
            availableColors={availableColors}
          />

          <main className="flex-1 min-w-0">
            {status === 'loading' ? (
              <div className="text-center py-12">{t('category.loading')}</div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
             <div className="flex flex-col items-center justify-center py-24 px-6 bg-linear-to-br from-ivory_sand via-soft_latte to-warm_caramel/30 rounded-3xl border-2 border-warm_caramel/30 shadow-lg">
                <div className="w-20 h-20 mb-6 rounded-full bg-white shadow-xl flex items-center justify-center ring-4 ring-warm_caramel/20">
                  <svg className="w-10 h-10 text-rustic_bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-dark_wood mb-2">{t('category.noProducts')}</h3>
               
               <Button onClick={() => {
                setPriceRange([priceMinMax.min, priceMinMax.max]);
                setSelectedColor('');
              }} className='w-auto bg-linear-to-r from-rustic_bronze to-clay_brown hover:from-rustic_bronze/90 hover:to-clay_brown/90 shadow-lg hover:shadow-xl transition-all duration-300' buttonText={t('category.clearFilters')}               
               ></Button>
              </div>
            )}
          </main>
        </div>
      </div>
  );
}
