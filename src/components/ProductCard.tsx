import React from 'react';
import { Star, ShieldCheck, Tag, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  cartCount: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  cartCount,
}) => {
  // Format price in PKR with commas
  const formatPrice = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Category visual illustration renderer (fallback images are custom SVG cards)
  const renderCategoryGraphic = () => {
    switch (product.category) {
      case 'Dry Food':
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-tr from-slate-950 via-indigo-950/20 to-slate-900 overflow-hidden">
            <div className="relative group-hover:scale-110 transition-transform duration-500 flex flex-col items-center">
              {/* Decorative bowl */}
              <div className="w-16 h-8 rounded-b-3xl bg-amber-600 border border-amber-500/30 shadow-indigo-900/50 relative flex items-center justify-center">
                <div className="absolute -top-3 w-12 h-4 rounded-full bg-amber-800 flex flex-wrap justify-center p-1 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-amber-300 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                </div>
              </div>
              {/* Star symbol inside bowl label */}
              <div className="bg-slate-900 px-1 py-0.5 rounded text-[7px] text-amber-500 font-bold border border-slate-800 mt-1 uppercase tracking-wider">
                Dry kibble
              </div>
            </div>
            {/* Background design accents */}
            <div className="absolute top-2 left-2 text-[9px] font-mono text-slate-600 uppercase tracking-widest">{product.brand}</div>
            <div className="absolute bottom-2 right-2 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[8px] font-medium text-slate-500">In Stock</span>
            </div>
          </div>
        );
      case 'Wet Food':
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-tr from-slate-950 via-teal-950/25 to-slate-900 overflow-hidden">
            <div className="relative group-hover:scale-110 transition-transform duration-500 flex flex-col items-center">
              {/* Can/Tin package graphic */}
              <div className="w-12 h-14 rounded-md bg-gradient-to-b from-indigo-500 to-indigo-700 border border-indigo-400/30 flex flex-col justify-between p-1.5 relative shadow-lg">
                <span className="text-[7px] text-teal-300 font-extrabold uppercase text-center leading-none">WET</span>
                <div className="w-full h-1 bg-amber-500 rounded" />
                <span className="text-[6px] text-white/80 font-mono text-center">{product.weight}</span>
              </div>
            </div>
            {/* Background design accents */}
            <div className="absolute top-2 left-2 text-[9px] font-mono text-slate-600 uppercase tracking-widest">{product.brand}</div>
            <div className="absolute bottom-2 right-2 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[8px] font-medium text-slate-500">In Stock</span>
            </div>
          </div>
        );
      case 'Treats':
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-tr from-slate-950 via-rose-950/20 to-slate-900 overflow-hidden">
            <div className="relative group-hover:scale-110 transition-transform duration-500 flex flex-col items-center">
              {/* Lollipop snack graphic */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 border border-amber-300 flex items-center justify-center shadow-lg">
                  <span className="text-[8px] text-amber-950 font-bold font-sans">100%</span>
                </div>
                <div className="w-1.5 h-7 bg-slate-700 rounded-b" />
              </div>
            </div>
            {/* Background design accents */}
            <div className="absolute top-2 left-2 text-[9px] font-mono text-slate-600 uppercase tracking-widest">{product.brand}</div>
            <div className="absolute bottom-2 right-2 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[8px] font-medium text-slate-500">In Stock</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 hover:shadow-2xl hover:shadow-indigo-950/20 active:scale-[0.99] transition-all overflow-hidden h-full"
    >
      
      {/* Product Image Space with Custom Decorative Icon Graphic */}
      <div className="relative w-full aspect-video sm:aspect-square bg-slate-950 flex-shrink-0 border-b border-slate-800 overflow-hidden">
        {renderCategoryGraphic()}

        {/* Floating Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10 items-end">
          
          {/* Sale tag */}
          {product.isSale && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-lg">
              <Tag className="w-3 h-3" />
              Sale
            </span>
          )}

          {/* Category Tag */}
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 text-[10px] font-semibold border border-slate-700/50 backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        {/* Floating weight tag in image area bottom-left */}
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-slate-900/85 text-[10px] font-bold text-amber-400 border border-slate-800 backdrop-blur-sm shadow z-10 font-mono">
          {product.weight}
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 flex flex-col flex-1 text-left">
        
        {/* Brand Name */}
        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
          {product.brand}
        </span>

        {/* Product Name */}
        <h3 className="font-display font-semibold text-sm sm:text-base text-white mt-1 group-hover:text-amber-400 transition-colors line-clamp-2 min-h-[2.5rem] leading-snug">
          {product.name}
        </h3>

        {/* Star Rating details */}
        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-current text-amber-400'
                    : 'text-slate-700'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-slate-400 font-mono">
            {product.rating.toFixed(1)}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Footer Area with Price and Cart Addition */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
          
          {/* Prices */}
          <div>
            <span className="block text-[8px] uppercase tracking-wider text-slate-500 font-semibold leading-none">Price</span>
            <span className="font-display font-black text-base sm:text-lg text-white">
              ₨ {formatPrice(product.price)}
            </span>
          </div>

          {/* Add To Cart Trigger */}
          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={() => onAddToCart(product)}
            className="relative inline-flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 font-semibold text-xs active:scale-95 transition-all cursor-pointer border border-slate-700/60 hover:border-indigo-500 shadow-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
            
            {/* Show item dynamic badge increment */}
            {cartCount > 0 && (
              <span className="bg-amber-400 text-slate-950 font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-slate-900 absolute -top-1.5 -right-1.5">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
