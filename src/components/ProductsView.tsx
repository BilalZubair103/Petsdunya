import React, { useState, useMemo } from 'react';
import { Product, CartItem } from '../types';
import { Search, Star, Sparkles, Filter, RefreshCw, ShoppingCart, Ban } from 'lucide-react';

interface ProductsViewProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  cart: CartItem[];
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  onAddToCart,
  cart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Dry Food' | 'Wet Food' | 'Treats'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // PKR formatter function
  const formatPrice = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Live filter computation for all 30 products
  const filteredItems = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Helper inside client to match raw counts
  const getItemCountInCart = (productId: number) => {
    return cart.find(item => item.product.id === productId)?.quantity || 0;
  };

  const categories: ('All' | 'Dry Food' | 'Wet Food' | 'Treats')[] = ['All', 'Dry Food', 'Wet Food', 'Treats'];

  return (
    <div id="products-view" className="space-y-8 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Search & Intro Area */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="text-left">
          <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-extrabold block">Pets Dunya Quality</span>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 mt-1">Our Feline Diet Catalog</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover {products.length} catalog options including organic premium kibbles, wet supports, and freeze-dried lollipop treats.
          </p>
        </div>

        {/* Beautiful Real-time Search Input */}
        <div className="w-full md:max-w-md relative flex items-center">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
            <Search className="w-4 h-4" />
          </span>
          <input
            id="catalog-search"
            type="text"
            placeholder="Search dry food, wet pouches, treats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-sm rounded-xl pl-10 pr-16 py-2.5 outline-hidden focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] py-1 px-2 font-bold text-slate-500 hover:text-slate-700 bg-slate-200/60 hover:bg-slate-200 transition-colors rounded"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Structural Grid: Filter categories leftmost, and Catalog product list rightmost */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar filter tabs block */}
        <aside className="md:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs text-left space-y-4">
          <div className="flex items-center gap-2 text-slate-850 border-b border-slate-100 pb-3">
            <Filter className="w-4 h-4 text-blue-600" />
            <h3 className="font-display font-extrabold text-xs uppercase tracking-widest text-slate-800">
              Categories
            </h3>
          </div>

          <div className="flex xl:flex-col flex-wrap lg:flex-row gap-2.5">
            {categories.map((category) => {
              const active = selectedCategory === category;
              const countOfProducts = products.filter(p => category === 'All' || p.category === category).length;
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-50 text-slate-705 hover:bg-slate-100/90'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${active ? 'bg-white/20 text-white' : 'bg-slate-250/20 text-slate-500'}`}>
                    {countOfProducts}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Prompt banner under sidebar */}
          <div className="pt-4 border-t border-slate-100 bg-gradient-to-tr from-yellow-500/5 to-amber-500/10 p-3 rounded-xl border border-yellow-505/20 text-left">
            <span className="text-[9px] font-bold text-yellow-600 uppercase block mb-1">Lahore & Karachi Stock</span>
            <p className="text-[10px] text-slate-600 leading-normal">
              Order values formatted dynamically. Use WhatsApp cart checkout to order instantly from anywhere in major cities.
            </p>
          </div>

        </aside>

        {/* Right product container showcase */}
        <section className="md:col-span-9 space-y-6">
          
          {/* Header count indicator */}
          <div className="flex justify-between items-center text-xs text-slate-500 text-left">
            <span>
              Showing <span className="font-bold text-slate-800">{filteredItems.length}</span> foods under category "{selectedCategory}"
            </span>
            {searchQuery && (
              <span>Matching: "{searchQuery}"</span>
            )}
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-20 px-6 bg-white border border-slate-205 rounded-3xl text-center max-w-md mx-auto flex flex-col items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                <Ban className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <h3 className="font-display font-medium text-slate-850">No Results Found</h3>
                <p className="text-xs text-slate-500 mt-1">
                  We couldn't locate any products matching "{searchQuery}" under "{selectedCategory}".
                </p>
              </div>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-lg text-slate-700 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((product) => {
                const countInCart = getItemCountInCart(product.id);
                return (
                  <div
                    key={product.id}
                    className="group flex flex-col rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    {/* Item Image */}
                    <div className="relative aspect-video bg-slate-100 border-b border-slate-150 overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[9px] font-bold bg-slate-900/80 text-white font-mono uppercase backdrop-blur-xs">
                        {product.category}
                      </span>
                    </div>

                    {/* Meta info & content */}
                    <div className="p-4 flex flex-col flex-1 text-left">
                      
                      {/* Product Brand estimation */}
                      <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                        Pets Dunya Selection
                      </span>

                      {/* Title */}
                      <h3 className="font-display font-black text-slate-800 text-sm sm:text-base mt-1 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                      </h3>

                      {/* Standard Ratings */}
                      <div className="flex items-center gap-1.5 mt-1 pb-3">
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-500" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">4.9</span>
                      </div>

                      {/* Descriptive placeholder sub-text */}
                      <p className="text-xs text-slate-500 leading-normal flex-1">
                        High-energy imported diet containing balanced minerals and vital proteins keeping your cat happy and active.
                      </p>

                      {/* Bottom row: Price and Cart addition triggers */}
                      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2.5">
                        <div className="text-left leading-none">
                          <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Price</span>
                          <span className="font-display font-extrabold text-base sm:text-lg text-slate-900 leading-none">
                            ₨ {formatPrice(product.price)}
                          </span>
                        </div>

                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-3.5 py-2 inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl active:scale-95 transition-all cursor-pointer relative"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add</span>
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
          )}

        </section>

      </div>

    </div>
  );
};
