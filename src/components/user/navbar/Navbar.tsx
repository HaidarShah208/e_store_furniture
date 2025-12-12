import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Search, Languages, Heart, User } from 'lucide-react';
import { useAppSelector } from '../../../redux/hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

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

  return (
    <nav className=" bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            FURNI<span className="text-blue-600">.</span>
          </Link>
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('navbar.searchPlaceholder')}
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
   
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">{t('navbar.home')}</Link>
            <Link to="/category/Readymade" className="hover:text-blue-600 transition-colors">{t('navbar.readymade')}</Link>
            <Link to="/category/Unpolished" className="hover:text-blue-600 transition-colors">{t('navbar.unpolished')}</Link>
          </div>
          
          {wishlistCount >= 0 && (
            <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="h-5 w-5 text-red-500 " />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {wishlistCount}
              </span>
            </Link>
          )}
          
           <Link to="/auth/login" className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Sign In">
            <User className="h-5 w-5 text-gray-700" />
          </Link>
          <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50">
              <Languages className="h-4 w-4" />
              <span>{currentLang === 'en' ? t('navbar.english') : t('navbar.urdu')}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => handleLanguageChange('en')}>
                {t('navbar.english')}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleLanguageChange('ur')}>
                {t('navbar.urdu')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-md">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-white">
          <Link to="/" className="block text-sm font-medium hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>{t('navbar.home')}</Link>
          <Link to="/category/Readymade" className="block text-sm font-medium hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>{t('navbar.readymade')}</Link>
          <Link to="/category/Unpolished" className="block text-sm font-medium hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>{t('navbar.unpolished')}</Link>
          <div className="flex items-center gap-3 pt-2">
            <span className="text-sm font-medium text-gray-600">{t('navbar.language')}:</span>
            <button
              className={`text-sm px-3 py-1 rounded-full border ${currentLang === 'en' ? 'border-blue-600 text-blue-600' : 'border-gray-200 text-gray-600'}`}
              onClick={() => handleLanguageChange('en')}
            >
              {t('navbar.english')}
            </button>
            <button
              className={`text-sm px-3 py-1 rounded-full border ${currentLang === 'ur' ? 'border-blue-600 text-blue-600' : 'border-gray-200 text-gray-600'}`}
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
