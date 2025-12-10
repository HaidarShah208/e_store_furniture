import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchProducts } from '../../../redux/slices/productsSlice';
import ProductGrid from '../../../components/user/productGrid/ProductGrid';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Package, Truck, Award } from 'lucide-react';
import HeroCarousel from '@/components/user/heroCaresouel/HeroCaresouel';
import { getSlides } from '@/lib/static/data';

export default function Home() {
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector((state) => state.products);
  const { t } = useTranslation();
 const slides = useMemo(() => getSlides(t), [t]);

 

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="flex flex-col gap-16 pb-16 overflow-x-hidden">
     <HeroCarousel slides={slides} autoPlay={true} interval={5000} />


      <section className="bg-amber-50 border-y border-amber-100">
        <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-900">
          <FeatureCard
            icon={<Package className="h-7 w-7" />}
            title="Easy Modular Installing"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ullamcorper blandit urna at finibus."
          />
          <FeatureCard
            icon={<Truck className="h-7 w-7" />}
            title="Fast & Free Shipping"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ullamcorper blandit urna at finibus."
          />
          <FeatureCard
            icon={<Award className="h-7 w-7" />}
            title="Top Quality Products"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ullamcorper blandit urna at finibus."
          />
        </div>
      </section>

      <section className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('home.finishHeadline')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/category/Readymade" className="group relative h-80 overflow-hidden rounded-lg bg-gray-200 cursor-pointer block">
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors z-10">
              <h3 className="text-4xl font-bold text-white">{t('home.readymade')}</h3>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" 
              alt="Readymade" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
          <Link to="/category/Unpolished" className="group relative h-80 overflow-hidden rounded-lg bg-gray-200 cursor-pointer block">
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors z-10">
              <h3 className="text-4xl font-bold text-white">{t('home.unpolished')}</h3>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1577140917170-285929db55cc?w=800&q=80" 
              alt="Unpolished" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
        </div>
      </section>

      <section className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">{t('home.featured')}</h2>
        </div>
        
        {status === 'loading' ? (
          <div className="text-center py-12">{t('home.loading')}</div>
        ) : (
          <ProductGrid products={featuredProducts} />
        )}
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className=" flex items-center  text-amber-700">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-slate-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
