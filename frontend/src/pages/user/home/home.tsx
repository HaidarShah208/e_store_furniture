import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchProducts } from '../../../redux/slices/productsSlice';
import ProductGrid from '../../../components/user/productGrid/ProductGrid';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Home() {
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-linear-to-r from-gray-200 to-gray-300" />
        </div>
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Modern Furniture for <br />
            <span className="text-blue-600 font-urbanist">Every Space</span>
          </h1>
          <p className="text-lg text-primary_dark max-w-2xl font-base mx-auto mb-8">
            Choose from our premium Readymade collection or customize with our Unpolished range.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/category/Readymade" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white shadow hover:bg-blue-600/90 h-10 px-8"
            >
              Shop Readymade
            </Link>
            <Link 
              to="/category/Unpolished" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-gray-100 h-10 px-8"
            >
              Shop Unpolished
            </Link>
            <Button>Click me</Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Finish</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/category/Readymade" className="group relative h-80 overflow-hidden rounded-lg bg-gray-200 cursor-pointer block">
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors z-10">
              <h3 className="text-4xl font-bold text-white">Readymade</h3>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" 
              alt="Readymade" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
          <Link to="/category/Unpolished" className="group relative h-80 overflow-hidden rounded-lg bg-gray-200 cursor-pointer block">
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors z-10">
              <h3 className="text-4xl font-bold text-white">Unpolished</h3>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1577140917170-285929db55cc?w=800&q=80" 
              alt="Unpolished" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Collection</h2>
        </div>
        
        {status === 'loading' ? (
          <div className="text-center py-12">Loading products...</div>
        ) : (
          <ProductGrid products={featuredProducts} />
        )}
      </section>
    </div>
  );
}
