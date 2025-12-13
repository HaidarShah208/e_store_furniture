import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchProducts } from '../../../redux/slices/productsSlice';
import ProductCard from '../../../components/common/productCard/ProductCard';
import { useTranslation } from 'react-i18next';

type PriceRange = [number, number];

export default function AllBrands() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector((state) => state.products);

  const [priceRange, setPriceRange] = useState<PriceRange>([0, 0]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const minMax = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      setPriceRange([minMax.min, minMax.max]);
    }
  }, [products, minMax.min, minMax.max]);

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    products.forEach((p) => {
      map.set(p.type, (map.get(p.type) ?? 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [products]);

  const filteredProducts = products.filter((p) => {
    const withinPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(p.type);
    return withinPrice && matchesCategory;
  });

  const handleMinChange = (value: number) => {
    setPriceRange(([_, max]) => [Math.min(value, max), max]);
  };

  const handleMaxChange = (value: number) => {
    setPriceRange(([min, _]) => [min, Math.max(value, min)]);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500">{t('brands.title')}</p>
        <h1 className="text-4xl font-bold mt-2 mb-3">{t('brands.subtitle')}</h1>
        <p className="text-gray-600 max-w-2xl">
          {t('brands.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-8">
        <aside className="bg-white border rounded-lg p-5 shadow-sm">
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t('brands.filterByPrice')}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={minMax.min}
                  max={minMax.max}
                  value={priceRange[0]}
                  onChange={(e) => handleMinChange(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <input
                  type="range"
                  min={minMax.min}
                  max={minMax.max}
                  value={priceRange[1]}
                  onChange={(e) => handleMaxChange(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              <p className="text-sm text-gray-700">
                {t('brands.price')}: ${priceRange[0].toFixed(0)} - ${priceRange[1].toFixed(0)}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('brands.filterByCategory')}</h3>
            <div className="space-y-3">
              {categories.map((cat) => (
                <label key={cat.name} className="flex items-center justify-between text-gray-700">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.name)}
                      onChange={() => toggleCategory(cat.name)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="space-y-6">
          {status === 'loading' && <div className="text-center py-10">{t('brands.loading')}</div>}
          {status !== 'loading' && filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-lg border">
              <p className="text-lg text-gray-600">{t('brands.noProductsMatch')}</p>
            </div>
          )}
          {filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

