import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchProducts } from '../../../redux/slices/productsSlice';
import ProductGrid from '../../../components/user/productGrid/ProductGrid';
import { useTranslation } from 'react-i18next';

export default function ProductCategory() {
  const { type } = useParams<{ type: string }>();
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector((state) => state.products);
  const { t } = useTranslation();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = products.filter((p) => p.finishType === type);
  const typeLabel = type ?? '';

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{t('category.title', { type: typeLabel })}</h1>
        <p className="text-gray-600">
          {t('category.subtitle', { type: typeLabel.toLowerCase() })}
        </p>
      </div>

      {status === 'loading' ? (
        <div className="text-center py-12">{t('category.loading')}</div>
      ) : filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-500">{t('category.empty')}</p>
        </div>
      )}
    </div>
  );
}
