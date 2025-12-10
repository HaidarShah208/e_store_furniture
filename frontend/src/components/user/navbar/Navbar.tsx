import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Search } from 'lucide-react';
import { useAppSelector } from '../../../redux/hooks';
import { useState } from 'react';

export default function Navbar() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            FURNI<span className="text-blue-600">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/category/Readymade" className="hover:text-blue-600 transition-colors">Readymade</Link>
            <Link to="/category/Unpolished" className="hover:text-blue-600 transition-colors">Unpolished</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              placeholder="Search furniture..." 
              className="pl-8 h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600" 
            />
          </div>
          
          <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-md">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-white">
          <Link to="/" className="block text-sm font-medium hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/category/Readymade" className="block text-sm font-medium hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Readymade</Link>
          <Link to="/category/Unpolished" className="block text-sm font-medium hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Unpolished</Link>
        </div>
      )}
    </nav>
  );
}
