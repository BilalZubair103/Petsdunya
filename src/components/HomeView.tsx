import React from 'react';
import { Product, CartItem } from '../types';
import { ArrowRight, Star, Sparkles, ShieldCheck, Heart, Truck } from 'lucide-react';

interface HomeViewProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  setCurrentView: (view: 'home' | 'products' | 'about' | 'contact') => void;
  cart: CartItem[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  onAddToCart,
  setCurrentView,
  cart,
}) => {
  // Filter for only featured products
  const featuredItems = products.filter(p => p.featured);

  // Helper inside client to match raw counts
  const getItemCountInCart = (productId: number) => {
    return cart.find(item => item.product.id === productId)?.quantity || 0;
  };

  // PKR formatter function
  const formatPrice = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div id="home-view" className="space-y-16 animate-fade-in">
      
      {/* Modern Blue-and-White Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-blue-900 via-blue-800 to-blue-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-4 py-12 sm:py-20 lg:py-24 shadow-xl border border-blue-950">
        {/* Background decorative layout rings */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-200 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-400/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Premium Imported Brands • Lahore & Karachi Stock</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight max-w-4xl mx-auto">
            Premium Nutrition For <br />
            <span className="text-yellow-400">Your Feline Companions</span>
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            Nourish them with authorized premium diets, dry kibbles, clinical wet supports, and organic freeze-dried lollipops sourced directly from Pets Dunya Pakistan. Authenticity guaranteed.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentView('products')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-extrabold text-sm shadow-lg shadow-yellow-400/15 transition-all active:scale-98 cursor-pointer"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4 text-blue-950" />
            </button>
            <button
              onClick={() => setCurrentView('about')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all border border-white/20 cursor-pointer"
            >
              Learn Quality Standards
            </button>
          </div>
        </div>
      </section>

      {/* Trust guarantees badge line */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <ShieldCheck className="w-5 h-5 text-blue-600" />, title: "100% Genuine Stock", desc: "No copycat packaging" },
            { icon: <Truck className="w-5 h-5 text-blue-600" />, title: "Same-Day Karachi", desc: "Delivered fresh & fast" },
            { icon: <Heart className="w-5 h-5 text-blue-600" />, title: "Veterinary Approved", desc: "Formulated diets only" },
            { icon: <Star className="w-5 h-5 text-blue-600 fill-blue-600" />, title: "Best PKR Pricing", desc: "Direct importer rates" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200/80 p-4 rounded-2xl flex flex-col items-start text-left gap-2 shadow-xs">
              <div className="p-2 justify-center rounded-xl bg-blue-50">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{item.title}</h4>
                <p className="text-[11px] text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase Section (Only showing first 6 products) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5 text-left">
          <div>
            <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-extrabold block">Bestsellers Selection</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
              Featured Diet Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Our 6 most requested cat dry recipes hand-picked for high growth and shiny coat textures.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('products')}
            className="flex items-center gap-1 text-xs font-extrabold text-blue-600 hover:text-blue-700 hover:underline shrink-0 group self-start sm:self-end"
          >
            <span>View All 30 Products</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Featured items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredItems.map((product) => {
            const countInCart = getItemCountInCart(product.id);
            return (
              <div 
                key={product.id}
                className="group relative flex flex-col rounded-3xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image overlay box */}
                <div className="relative aspect-video w-full bg-slate-100 overflow-hidden border-b border-slate-150">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2 py-1 rounded bg-slate-900/80 text-white text-[10px] font-mono font-bold uppercase backdrop-blur-xs">
                    {product.category}
                  </span>
                  
                  {/* Hot featured tag */}
                  <span className="absolute top-3 right-3 px-2 py-1 rounded bg-blue-600 text-white text-[9px] font-sans font-bold uppercase tracking-widest shadow-md">
                    Featured
                  </span>
                </div>

                {/* Body details */}
                <div className="p-5 flex flex-col flex-1 text-left">
                  
                  {/* Category name */}
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Top Feline Formula
                  </span>

                  {/* Title */}
                  <h3 className="font-display font-black text-slate-800 text-base sm:text-lg mt-1 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating representation */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-500" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 font-mono">(4.9)</span>
                  </div>

                  <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed flex-grow">
                    Tailored protein recipe crafted with digestible grain fibers for Persian or local indoor felines. Includes prebiotics.
                  </p>

                  {/* Pricing and Cart add trigger */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-semibold leading-none">Net Price</span>
                      <span className="font-display font-black text-lg text-slate-900 mt-1 block">
                        ₨ {formatPrice(product.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer relative"
                    >
                      <span>Add to Cart</span>
                      {countInCart > 0 && (
                        <span className="absolute -top-2 -right-2 text-[9px] font-black w-5 h-5 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center border-2 border-white">
                          {countInCart}
                        </span>
                      )}
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* View all products bottom CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentView('products')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-sm transition-all shadow-xs cursor-pointer"
          >
            <span>Browse Full Product Range (All 30 Items Available)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </section>

    </div>
  );
};
