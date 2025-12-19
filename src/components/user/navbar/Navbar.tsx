import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, Search, Languages, Heart, User } from 'lucide-react';
import { useAppSelector } from '../../../redux/hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
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
  <>
    <style>
      {`
        .nav-link {
          position: relative;
          display: inline-block;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #9C6644, #B08968, #DDB892);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .nav-link:hover::after {
          transform: scaleX(1);
        }

        .nav-link.active::after {
          transform: scaleX(1);
        }
      `}
    </style>
  <motion.nav
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
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
            <NavLink to="/" className={({ isActive }) => `nav-link hover:text-dark_wood text-rustic_bronze transition-colors ${isActive ? 'active' : ''}`}>{t('navbar.home')}</NavLink>
            <NavLink to="/category/Readymade" className={({ isActive }) => `nav-link hover:text-dark_wood text-rustic_bronze transition-colors ${isActive ? 'active' : ''}`}>{t('navbar.readymade')}</NavLink>
            <NavLink to="/category/Unpolished" className={({ isActive }) => `nav-link hover:text-dark_wood text-rustic_bronze transition-colors ${isActive ? 'active' : ''}`}>{t('navbar.unpolished')}</NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link hover:text-dark_wood text-rustic_bronze transition-colors ${isActive ? 'active' : ''}`}>{t('navbar.about')}</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link hover:text-dark_wood text-rustic_bronze transition-colors ${isActive ? 'active' : ''}`}>{t('navbar.contact')}</NavLink>
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t p-4 font-semi-bold space-y-4 bg-white overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link to="/" className="block text-deep_walnut text-sm font-medium hover:text-deep_walnut" onClick={() => setIsMenuOpen(false)}>{t('navbar.home')}</Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Link to="/category/Readymade" className="block text-deep_walnut text-sm font-medium hover:text-deep_walnut" onClick={() => setIsMenuOpen(false)}>{t('navbar.readymade')}</Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/category/Unpolished" className="block text-deep_walnut text-sm font-medium hover:text-deep_walnut" onClick={() => setIsMenuOpen(false)}>{t('navbar.unpolished')}</Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Link to="/about" className="block text-deep_walnut text-sm font-medium hover:text-deep_walnut" onClick={() => setIsMenuOpen(false)}>{t('navbar.about')}</Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/contact" className="block text-deep_walnut text-sm font-medium hover:text-deep_walnut" onClick={() => setIsMenuOpen(false)}>{t('navbar.contact')}</Link>
            </motion.div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  </>
  );
}
