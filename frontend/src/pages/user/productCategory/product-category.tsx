import { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchProducts } from '../../../redux/slices/productsSlice';
import ProductCard from '../../../components/common/productCard/ProductCard';
import { useTranslation } from 'react-i18next';

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

// Color name to hex code mapping
const colorMap: Record<string, string> = {
  'Beige': '#F5F5DC',
  'Black': '#000000',
  'Brown': '#8B4513',
  'Blue': '#0000FF',
  'Green': '#008000',
  'Grey': '#808080',
  'Gray': '#808080',
  'Yellow': '#FFFF00',
  'Natural Wood': '#D2B48C',
  'Natural Pine': '#D2B48C',
  'Natural': '#D2B48C',
  'White': '#FFFFFF',
  'Red': '#FF0000',
  'Orange': '#FFA500',
  'Purple': '#800080',
  'Pink': '#FFC0CB',
  'Navy': '#000080',
  'Teal': '#008080',
  'Cream': '#FFFDD0',
  'Tan': '#D2B48C',
  'Charcoal': '#36454F',
  'Ivory': '#FFFFF0',
  'Burgundy': '#800020',
  'Maroon': '#800000',
  'Olive': '#808000',
  'Lime': '#00FF00',
  'Cyan': '#00FFFF',
  'Magenta': '#FF00FF',
  'Silver': '#C0C0C0',
  'Gold': '#FFD700',
  'Bronze': '#CD7F32',
  'Copper': '#B87333'
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

 

  const handleMinPriceChange = (value: number) => {
    setPriceRange([Math.min(value, priceRange[1]), priceRange[1]]);
  };

  const handleMaxPriceChange = (value: number) => {
    setPriceRange([priceRange[0], Math.max(value, priceRange[0])]);
  };

  const getColorHex = (colorName: string): string => {
    return colorMap[colorName] || '#CCCCCC';
  };

  return (
    <div className="w-full">
      {/* Category Hero Image Section */}
      {categoryImage && (
        <div className="relative w-[85%] mx-auto h-64 md:h-96 lg:h-[330px] mb-8 md:mb-12">
          <img
            src={categoryImage}
            alt={displayName}
            className="w-full h-full object-cover rounded-4xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/1200x500?text=' + displayName;
            }}
          />
          <div className="absolute inset-0 bg-black/30 rounded-4xl flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {displayName}
            </h1>
            <nav className="text-sm md:text-base text-white/90">
              <Link to="/" className="hover:text-white transition-colors">HOME</Link>
              <span className="mx-2">/</span>
              <Link to="/shop" className="hover:text-white transition-colors">SHOP</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{displayName.toUpperCase()}</span>
            </nav>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm md:text-base text-gray-600 font-medium">
            SHOWING ALL {filteredProducts.length} RESULTS
          </p>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Default sorting</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
              <option>Name: Z to A</option>
            </select>
            <svg
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Flex Layout: Filters (Left) + Products (Right) */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters (1 column) */}
          <aside className="w-full lg:w-[280px] shrink-0 bg-white   rounded-lg p-5 shadow-sm h-fit">
            {/* Price Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter by price</h3>
              <div className="space-y-4">
                {/* Dual Range Slider Container */}
                <div className="relative h-2 bg-gray-200 rounded-lg">
                  {/* Track */}
                  <div 
                    className="absolute h-2 bg-blue-600 rounded-lg"
                    style={{
                      left: `${((priceRange[0] - priceMinMax.min) / (priceMinMax.max - priceMinMax.min)) * 100}%`,
                      width: `${((priceRange[1] - priceRange[0]) / (priceMinMax.max - priceMinMax.min)) * 100}%`
                    }}
                  />
                  {/* Min Handle */}
                  <input
                    type="range"
                    min={priceMinMax.min}
                    max={priceMinMax.max}
                    value={priceRange[0]}
                    onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-10"
                    style={{
                      background: 'transparent',
                      WebkitAppearance: 'none',
                    }}
                  />
                  {/* Max Handle */}
                  <input
                    type="range"
                    min={priceMinMax.min}
                    max={priceMinMax.max}
                    value={priceRange[1]}
                    onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                    className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-10"
                    style={{
                      background: 'transparent',
                      WebkitAppearance: 'none',
                    }}
                  />
                  {/* Custom Handles */}
                  <div 
                    className="absolute w-4 h-4 bg-white border-2 border-blue-600 rounded-full top-1/2 -translate-y-1/2 cursor-pointer shadow-md hover:scale-110 transition-transform z-20"
                    style={{ left: `calc(${((priceRange[0] - priceMinMax.min) / (priceMinMax.max - priceMinMax.min)) * 100}% - 8px)` }}
                  />
                  <div 
                    className="absolute w-4 h-4 bg-white border-2 border-blue-600 rounded-full top-1/2 -translate-y-1/2 cursor-pointer shadow-md hover:scale-110 transition-transform z-20"
                    style={{ left: `calc(${((priceRange[1] - priceMinMax.min) / (priceMinMax.max - priceMinMax.min)) * 100}% - 8px)` }}
                  />
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  Price: ${priceRange[0].toFixed(0)} - ${priceRange[1].toFixed(0)}
                </p>
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter by color</h3>
              <div className="space-y-3">
                {availableColors.map((color) => (
                  <label
                    key={color.name}
                    className="flex items-center justify-between text-gray-700 cursor-pointer hover:text-gray-900 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                        style={{ backgroundColor: getColorHex(color.name) }}
                      />
                      <input
                        type="radio"
                        name="color"
                        value={color.name}
                        checked={selectedColor === color.name}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="sr-only"
                      />
                      <span className="text-sm">{color.name}</span>
                    </div>
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full group-hover:bg-gray-200 transition-colors">
                      {color.count}
                    </span>
                  </label>
                ))}
                {availableColors.length === 0 && (
                  <p className="text-sm text-gray-500">No colors available</p>
                )}
              </div>
              {selectedColor && (
                <button
                  onClick={() => setSelectedColor('')}
                  className="mt-4 text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Clear color filter
                </button>
              )}
            </div>
          </aside>

          {/* Right Side - Product Grid (3 columns) */}
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
              <div className="text-center py-20 bg-gray-50 rounded-lg">
                <p className="text-xl text-gray-500">No products found in this category.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
