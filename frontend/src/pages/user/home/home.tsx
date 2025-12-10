import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchProducts } from '../../../redux/slices/productsSlice';
import ProductGrid from '../../../components/user/productGrid/ProductGrid';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Package, Truck, Award } from 'lucide-react';

export default function Home() {
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector((state) => state.products);
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo(
    () => [
      {
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80&auto=format&fit=crop',
        title: `${t('home.heroTitleLine1')} ${t('home.heroTitleLine2')}`,
        subtitle: t('home.heroSubtitle'),
        ctaPrimary: t('home.shopReadymade'),
        ctaSecondary: t('home.shopUnpolished'),
      },
      {
        image: 'https://images.unsplash.com/photo-1577140917170-285929db55cc?w=1600&q=80&auto=format&fit=crop',
        title: t('home.featured'),
        subtitle: t('home.heroSubtitle'),
        ctaPrimary: t('home.shopUnpolished'),
        ctaSecondary: t('home.shopReadymade'),
      },
      {
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80&auto=format&fit=crop',
        title: t('home.finishHeadline'),
        subtitle: t('home.heroSubtitle'),
        ctaPrimary: t('home.shopReadymade'),
        ctaSecondary: t('home.shopUnpolished'),
      },
    ],
    [t]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Full-width Carousel */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[520px] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700"
          style={{ transform: `translateX(-${currentSlide * 100}%)`, width: `${slides.length * 100}%` }}
        >
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className="relative w-full shrink-0 h-full"
              style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
              <div className="relative z-10 h-full flex items-center max-w-4xl px-6 md:px-12">
                <div className="text-white space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">{slide.title}</h1>
                  <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">{slide.subtitle}</p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/category/Readymade"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-white text-blue-700 shadow-lg hover:bg-gray-100 h-11 px-6"
                    >
                      {slide.ctaPrimary}
                    </Link>
                    <Link
                      to="/category/Unpolished"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-white/70 text-white hover:bg-white hover:text-blue-700 h-11 px-6"
                    >
                      {slide.ctaSecondary}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </section>

      {/* Feature Highlights */}
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

      {/* Categories Section */}
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

      {/* Featured Products Section */}
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
      <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full shadow-sm text-amber-700">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-slate-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
