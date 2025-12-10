import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchProducts } from '../../../redux/slices/productsSlice';
import ProductGrid from '../../../components/user/productGrid/ProductGrid';

export default function ProductCategory() {
  const { type } = useParams<{ type: string }>();
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = products.filter((p) => p.finishType === type);

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{type} Collection</h1>
        <p className="text-gray-600">
          Browse our selection of {type?.toLowerCase()} furniture.
        </p>
      </div>

      {status === 'loading' ? (
        <div className="text-center py-12">Loading products...</div>
      ) : filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
