import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchProducts } from '../../../redux/slices/productsSlice';
import ProductGrid from '../../../components/user/productGrid/ProductGrid';
import FeatureCard from '../../../components/user/FeatureCard/FeatureCard';
import DiscountCard from '../../../components/user/DiscountCard/DiscountCard';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Package, Truck, Award } from 'lucide-react';
import HeroCarousel from '@/components/user/heroCaresouel/HeroCaresouel';
import { getSlides } from '@/lib/static/data';
import BrowseByRooms from '../../../components/user/browseByRooms/BrowseByRooms';
import unpolished from '@/assets/user/img/images (1).jpeg'
import readyMade from '@/assets/user/img/polished.jpeg'
import sofa from '@/assets/user/featuredCard/sofa.jpeg'
import chair from '@/assets/user/featuredCard/chair.jpeg'
import table from '@/assets/user/featuredCard/table.jpeg'

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
    <div className="flex flex-col overflow-x-hidden">
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


      <section className="  mx-auto">
        <h2 className="title paddingtop paddingbottom font-bold  text-center">{t('home.finishHeadline')}</h2>
        <div className="grid isolate_bars grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/category/Readymade" className="group relative h-80 overflow-hidden rounded-lg bg-gray-200 cursor-pointer block">
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors z-10">
              <h3 className="text-4xl font-bold text-white">{t('home.readymade')}</h3>
            </div>
            <img 
              src={readyMade} 
              alt="Readymade" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
          <Link to="/category/Unpolished" className="group relative h-80 overflow-hidden rounded-lg bg-gray-200 cursor-pointer block">
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors z-10">
              <h3 className="text-4xl font-bold text-white">{t('home.unpolished')}</h3>
            </div>
            <img 
              src={unpolished} 
              alt="Unpolished" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
        </div>
      </section>

      <section className="isolate_bars">
        <div className="flex items-center justify-between mb-8">
          <h2 className="title paddingtop paddingbottom font-bold">{t('home.featured')}</h2>
        </div>
        
        {status === 'loading' ? (
          <div className="text-center py-12">{t('home.loading')}</div>
        ) : (
          <ProductGrid products={featuredProducts} />
        )}
      </section>

      <BrowseByRooms />

      
      <section className="isolate_bars">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DiscountCard
            title="Special Discount"
            discount="30% OFF"
            description="Aliquet sagittis purus faucibus egestas."
            image={chair}
            bgColor="bg-teal-50"
            link="/product-category/armchairs"
          />
          <DiscountCard
            title="Weekly Discount"
            discount="25% OFF"
            description="Nulla facilisi cras fermentum odio feugiat."
            image={sofa}
            bgColor="bg-orange-50"
            link="/product-category/sofas"
          />
          <DiscountCard
            title="Birthday Discount"
            discount="40% OFF"
            description="Porta non pulvinar neque laoreet suspendisse."
            image={table}
            bgColor="bg-gray-100"
            link="/product-category/tables"
          />
        </div>
      </section>
    </div>
  );
}

