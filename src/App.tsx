import { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ProductsView } from './components/ProductsView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { 
  Check, 
  X, 
  HelpCircle,
  MessageSquare,
  Sparkles,
  PhoneCall,
  ChevronUp,
  ShoppingCart
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'products' | 'about' | 'contact'>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Local storage synchronization for dynamic persistence of checkout baskets
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pets_dunya_premium_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Query actual backend Express API endpoint on component mounting
  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('API server reported error status');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[Error fetching products]', err);
        setLoading(false);
      });
  }, []);

  // Sync cart mutations back into client storage
  useEffect(() => {
    localStorage.setItem('pets_dunya_premium_cart', JSON.stringify(cart));
  }, [cart]);

  // Handle adding product
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setToastMessage(`Added "${product.name}" to basket!`);
    setIsToastOpen(true);
  };

  // Toast auto delay closure
  useEffect(() => {
    if (isToastOpen) {
      const hndr = setTimeout(() => {
        setIsToastOpen(false);
      }, 3500);
      return () => clearTimeout(hndr);
    }
  }, [isToastOpen]);

  // Update quantities
  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.product.id === productId) {
          const nextVal = item.quantity + delta;
          return nextVal > 0 ? { ...item, quantity: nextVal } : item;
        }
        return item;
      }).filter((item) => item.quantity > 0);
    });
  };

  // Erase item from cart
  const handleRemoveItem = (productId: number) => {
    const erased = cart.find(i => i.product.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (erased) {
      setToastMessage(`Removed "${erased.product.name}"`);
      setIsToastOpen(true);
    }
  };

  // Clear Basket Entirely
  const handleClearCart = () => {
    setCart([]);
    setToastMessage('Cleared all selected items.');
    setIsToastOpen(true);
  };

  // Trigger floating notifications
  const handleShowNotification = (message: string) => {
    setToastMessage(message);
    setIsToastOpen(true);
  };

  const totalCartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Dynamic View Switcher Routing
  const renderCurrentView = () => {
    if (loading) {
      return (
        <div id="loader-fallback" className="py-32 text-center max-w-sm mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-500">
            Synchronizing authorized sourced diets...
          </p>
        </div>
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <HomeView
            products={products}
            onAddToCart={handleAddToCart}
            setCurrentView={setCurrentView}
            cart={cart}
          />
        );
      case 'products':
        return (
          <ProductsView
            products={products}
            onAddToCart={handleAddToCart}
            cart={cart}
          />
        );
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView onSuccess={handleShowNotification} />;
      default:
        return (
          <div className="py-20 text-center font-bold">
            <p>Page View Not Resolved.</p>
          </div>
        );
    }
  };

  // scroll to top action
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col relative font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Upper Global Navigation */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Multi-View Frame Content */}
      <main className="flex-grow py-8 max-w-7xl mx-auto w-full">
        {renderCurrentView()}
      </main>

      {/* Persistent floating checkout bubble when drawer is closed */}
      {!isCartOpen && totalCartCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-full shadow-2xl active:scale-95 transition-all text-xs font-bold uppercase tracking-wider scale-105 cursor-pointer border border-blue-500/30"
          title="Review selected list and trigger checkout values"
        >
          <ShoppingCart className="w-4 h-4 text-white animate-bounce" />
          <span>Basket Checkout</span>
          <span className="bg-white text-blue-600 font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-mono leading-none">
            {totalCartCount}
          </span>
        </button>
      )}

      {/* Sticky Support Widget */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2">
        <a 
          href="https://wa.me/923172287931?text=Assalam-o-Alaikum!%20I%20have%20questions%20regarding%20your%20sourced%20cat%20diet%20catalog." 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-200 text-slate-700 px-4 py-2.5 rounded-full shadow-md text-xs font-semibold cursor-pointer select-none"
        >
          <MessageSquare className="w-4 h-4 text-emerald-500 fill-current" />
          <span>Support Chat</span>
        </a>
        
        {/* Scroll To Top helper */}
        <button 
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-200 cursor-pointer"
          title="Scroll To Top"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      {/* Slider checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Premium Notification Mini Toast */}
      {isToastOpen && (
        <div 
          id="toast-block"
          className="fixed bottom-24 right-6 z-50 p-4 bg-slate-900 border border-slate-800 text-white text-xs rounded-xl shadow-2xl flex items-center justify-between gap-3 max-w-sm animate-fade-in text-left pointer-events-auto"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <p className="font-medium leading-normal">{toastMessage}</p>
          </div>
          <button 
            onClick={() => setIsToastOpen(false)}
            className="p-0.5 rounded hover:bg-slate-800 text-slate-500 hover:text-slate-300 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Global Brand Footer */}
      <Footer setCurrentView={setCurrentView} />

    </div>
  );
}
