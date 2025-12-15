import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Search, Languages, Heart, User } from 'lucide-react';
import { useAppSelector } from '../../../redux/hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import logo from '@/assets/Logo.png';
export default function Navbar() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === 'ur' ? 'ur' : 'en';

  const handleLanguageChange = (lng: 'en' | 'ur') => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false);
  };

  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const categoryNav = document.querySelector('.category-nav');  
      if (!categoryNav) return;
      const rect = categoryNav.getBoundingClientRect();
      setIsTransparent(rect.bottom <= 0);  
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
  <nav
  className={`z-50 transition-all duration-500 ${
    isTransparent
      ? 'bg-white/30 backdrop-blur-md'  
      : 'bg-white'
  }`}
>
      <div className="  container pt-3 pb-4 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            <img src={logo} alt="logo" className='w-15 h-15' />
          </Link>
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-rustic_bronze" />
            <Input
              placeholder={t('navbar.searchPlaceholder')}
              className="rounded-md"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
   
              <div className="hidden md:flex items-center gap-6 text-sm font-semi-bold text-gray-600">
            <Link to="/" className="hover:text-dark_wood text-rustic_bronze transition-colors ">{t('navbar.home')}</Link>
            <Link to="/category/Readymade" className="hover:text-dark_wood text-rustic_bronze transition-colors">{t('navbar.readymade')}</Link>
            <Link to="/category/Unpolished" className="hover:text-dark_wood text-rustic_bronze transition-colors">{t('navbar.unpolished')}</Link>
            <Link to="/about" className="hover:text-dark_wood text-rustic_bronze transition-colors">{t('navbar.about')}</Link>
            <Link to="/contact" className="hover:text-dark_wood text-rustic_bronze transition-colors">{t('navbar.contact')}</Link>
          </div>
          
          {wishlistCount >= 0 && (
            <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="h-5 w-5 text-red-500 " />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {wishlistCount}
              </span>
            </Link>
          )}
          
           <Link to="/auth/login" className="p-2 hover:bg-soft_latte  rounded-full transition-colors" title="Sign In">
            <User className="h-5 w-5 text-deep_walnut" />
          </Link>
          <Link to="/cart" className="relative p-2 hover:bg-soft_latte rounded-full transition-colors">
            <ShoppingCart className="h-5 w-5 text-deep_walnut" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex font-semi-bold items-center gap-2 rounded-md border px-3 py-2 text-sm text-deep_walnut hover:bg-ivory_sand">
              <Languages className="h-4 w-4" />
              <span>{currentLang === 'en' ? t('navbar.english') : t('navbar.urdu')}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border font-semi-bold border-deep_walnut">
              <DropdownMenuItem className="text-dark_wood hover:bg-ivory_sand" onSelect={() => handleLanguageChange('en')}>
                {t('navbar.english')}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-dark_wood hover:bg-ivory_sand" onSelect={() => handleLanguageChange('ur')}>
                {t('navbar.urdu')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-deep_walnut rounded-md">
            <Menu className="h-5 w-5 text-deep_walnut" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t p-4 font-semi-bold space-y-4 bg-white">
          <Link to="/" className="block text-deep_walnut text-sm font-medium hover:text-deep_walnut" onClick={() => setIsMenuOpen(false)}>{t('navbar.home')}</Link>
          <Link to="/category/Readymade" className="block text-deep_walnut text-sm font-medium hover:text-deep_walnut" onClick={() => setIsMenuOpen(false)}>{t('navbar.readymade')}</Link>
          <Link to="/category/Unpolished" className="block text-deep_walnut text-sm font-medium hover:text-deep_walnut" onClick={() => setIsMenuOpen(false)}>{t('navbar.unpolished')}</Link>
          <Link to="/about" className="block text-deep_walnut text-sm font-medium hover:text-deep_walnut" onClick={() => setIsMenuOpen(false)}>{t('navbar.about')}</Link>
          <Link to="/contact" className="block text-deep_walnut text-sm font-medium hover:text-deep_walnut" onClick={() => setIsMenuOpen(false)}>{t('navbar.contact')}</Link>
          <div className="flex items-center gap-3 pt-2">
            <span className="text-sm font-medium text-deep_walnut">{t('navbar.language')}:</span>
            <button
              className={`text-sm px-3 py-1 rounded-full border ${currentLang === 'en' ? 'border-deep_walnut text-deep_walnut' : 'border-deep_walnut text-deep_walnut'}`}
              onClick={() => handleLanguageChange('en')}
            >
              {t('navbar.english')}
            </button>
            <button
              className={`text-sm px-3 py-1 rounded-full border ${currentLang === 'ur' ? 'border-deep_walnut text-deep_walnut' : 'border-deep_walnut text-deep_walnut'}`}
              onClick={() => handleLanguageChange('ur')}
            >
              {t('navbar.urdu')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
