import React from 'react';
import { Sparkles, ShieldCheck, Truck, Star, Award, Heart, Cat } from 'lucide-react';

interface HeroProps {
  onSelectCategory: (category: 'All' | 'Dry Food' | 'Wet Food' | 'Treats') => void;
  activeCategory: 'All' | 'Dry Food' | 'Wet Food' | 'Treats';
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory, activeCategory }) => {
  return (
    <section id="hero-section" className="relative overflow-hidden py-12 md:py-20 lg:py-24 border-b border-slate-800 bg-slate-950">
      
      {/* Decorative Blur Background Graphic */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-5 left-5 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Block */}
          <div className="md:col-span-7 flex flex-col items-start gap-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Premium Feline Catalog • Pets Dunya Inspired</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-none">
              Gourmet Dining For Your <br className="hidden lg:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-indigo-400">
                Luxurious Feline
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-xl font-sans leading-relaxed">
              Serving premium nutrition, veterinary formulas, critical wet support pouch, and irresistible lickable treats with exact pricing from the most trusted brand of Pets Dunya. Authentic brands directly imported & carefully handled in Karachi.
            </p>

            {/* Quick Action Category Pills */}
            <div className="mt-4 w-full">
              <span className="block text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">
                Quick Category Jump
              </span>
              <div className="flex flex-wrap gap-2">
                {(['All', 'Dry Food', 'Wet Food', 'Treats'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onSelectCategory(cat);
                      const catalog = document.getElementById('catalog-grid');
                      if (catalog) {
                        catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 scale-102 border border-amber-400'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quick trust highlights */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full mt-6 sm:mt-8 border-t border-slate-800/60 pt-6">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-400/20">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-[11px] sm:text-xs text-slate-300 font-medium">100% Original Stock</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-400/20">
                  <Truck className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Karachi Same Day</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-400/20">
                  <Award className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Best Rates in Pakistan</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-400/20">
                  <Heart className="w-4 h-4 text-indigo-400 animate-pulse" />
                </div>
                <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Loved by 10k+ Cats</span>
              </div>
            </div>

          </div>

          {/* Right Showcase Box */}
          <div className="md:col-span-5 relative flex items-center justify-center">
            
            {/* Gradient Glow backdrop behind decorative box */}
            <div className="absolute w-72 h-72 rounded-full bg-amber-500/10 blur-[80px]" />
            
            {/* Premium visual container */}
            <div className="relative w-full max-w-sm rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 text-center shadow-2xl shadow-indigo-950/40">
              
              {/* Star-badge absolute */}
              <div className="absolute -top-4 -right-4 p-3 bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-bold rounded-2xl shadow-xl flex flex-col items-center justify-center leading-none transform rotate-3">
                <Star className="w-5 h-5 text-slate-950 fill-current mb-0.5" />
                <span className="text-[9px] uppercase tracking-wider">Premium</span>
                <span className="text-sm font-extrabold pr-0.5">GRADE</span>
              </div>

              <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Featured Recipe</span>
              <h3 className="font-display font-bold text-xl text-white mt-1">Royal Canin Persian</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Carefully formulated design for magnificent Persian coatings and digestion support. ₨ 2,700
              </p>

              {/* Graphical dry Kibble representation made using beautiful nested circles */}
              <div className="my-5 relative flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border-4 border-dashed border-slate-800 hover:rotate-45 transition-transform duration-1000 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-950 via-slate-850 to-slate-900 border border-indigo-500/20 flex items-center justify-center">
                    <Cat className="w-14 h-14 text-indigo-400 animate-bounce" />
                  </div>
                </div>
                
                {/* Small floating detail indicators */}
                <div className="absolute top-2 left-6 px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[9px] font-mono text-amber-500">
                  Protein +32%
                </div>
                <div className="absolute bottom-5 right-2 px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[9px] font-mono text-indigo-400">
                  Omega 3 & 6
                </div>
              </div>

              <div className="flex items-center justify-between px-3 py-2 bg-slate-950 rounded-xl border border-slate-850">
                <div className="text-left">
                  <span className="block text-[8px] uppercase tracking-wider text-slate-500">Direct Delivery</span>
                  <span className="text-xs font-semibold text-slate-200">Across Pakistan</span>
                </div>
                <div className="text-right">
                  <span className="block text-[8px] uppercase tracking-wider text-slate-500 border-none">Active Staff</span>
                  <span className="text-xs font-semibold text-amber-400">Online 24/7</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 mt-3 italic">
                *Order via checkout drawer inside cart to send to WhatsApp immediately.
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
