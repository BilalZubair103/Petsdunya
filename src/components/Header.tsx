import React from 'react';
import { ShoppingCart, Menu, X, Cat, PhoneCall } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  currentView: 'home' | 'products' | 'about' | 'contact';
  setCurrentView: (view: 'home' | 'products' | 'about' | 'contact') => void;
  cart: CartItem[];
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  cart,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks: { label: string; view: 'home' | 'products' | 'about' | 'contact' }[] = [
    { label: 'Home', view: 'home' },
    { label: 'All Products', view: 'products' },
    { label: 'About Us', view: 'about' },
    { label: 'Contact Us', view: 'contact' },
  ];

  return (
    <nav id="global-navbar" className="sticky top-0 z-40 w-full bg-white border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Brand Area (Deep Blue Accents) */}
          <div 
            onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/10 group-hover:bg-blue-700 transition-colors">
              <Cat className="w-5.5 h-5.5" />
            </div>
            <div className="text-left font-sans">
              <span className="font-display font-extrabold text-lg sm:text-xl text-blue-900 tracking-tight flex items-center gap-1">
                PETS DUNYA <span className="text-blue-600">STORE</span>
              </span>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold leading-none">Pakistan's Choice</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => setCurrentView(link.view)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  currentView === link.view
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Cart Icon & Contact CTA button */}
          <div className="flex items-center gap-3">
            
            {/* Call support quick button */}
            <a 
              href="tel:03172287931" 
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 hover:border-blue-200 transition-colors rounded-lg text-xs font-semibold text-slate-700"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              <span>0317-2287931</span>
            </a>

            {/* Header Shopping Cart */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center justify-center p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 active:scale-95 transition-all cursor-pointer"
              title="Open checkout items basket"
            >
              <ShoppingCart className="w-5 h-5 text-slate-850" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white border-2 border-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-850 md:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Dynamic Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-md">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => {
                setCurrentView(link.view);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold block transition-all ${
                currentView === link.view
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:03172287931"
            className="w-full text-center flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors mt-2"
          >
            <PhoneCall className="w-4 h-4 text-blue-600" />
            <span>Call Support hotline: 0317-2287931</span>
          </a>
        </div>
      )}
    </nav>
  );
};
