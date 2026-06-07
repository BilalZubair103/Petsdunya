import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Send, ShieldCheck, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalBill = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  // PKR price formatter
  const formatPrice = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Generate perfect and direct WhatsApp message according to STRICT requirement text:
  // "Assalam-o-Alaikum! I want to order the following items from your Cat Food Store:
  // - [Product Name] x [Quantity] (₨ [Subtotal])
  // Total Bill: ₨ [Total]"
  const getWhatsAppURL = () => {
    let text = "Assalam-o-Alaikum! I want to order the following items from your Cat Food Store:\n";
    cart.forEach((item) => {
      const subtotal = item.product.price * item.quantity;
      text += `- ${item.product.name} x ${item.quantity} (₨ ${formatPrice(subtotal)})\n`;
    });
    text += `\nTotal Bill: ₨ ${formatPrice(totalBill)}`;
    
    return `https://wa.me/923172287931?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden font-sans">
      
      {/* Backdrop with elegant blur */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        
        {/* White Surface Drawer Container */}
        <div id="cart-drawer-card" className="w-screen max-w-md bg-white border-l border-slate-200 flex flex-col shadow-2xl relative">
          
          {/* Drawer Sticky Header */}
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <h2 className="font-display font-extrabold text-slate-900 text-lg">Your Basket Summary</h2>
              {totalQuantity > 0 && (
                <span className="bg-blue-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-full font-mono">
                  {totalQuantity}
                </span>
              )}
            </div>

            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-1 px-1.5 rounded-lg bg-slate-200/50 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transitioncursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body Scroll Content */}
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-8">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-350">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-800">Your Basket is Empty</h3>
                  <p className="text-xs text-slate-550 max-w-xs mt-1">
                    Select high-energy recipes or lickable organic snacks from our directory and tap ADD to checkout your items.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition"
                >
                  Return to Store Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Upper helper header */}
                <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                  <span className="font-bold">Itemized List ({cart.length})</span>
                  <button 
                    onClick={onClearCart}
                    className="text-red-650 hover:text-red-750 font-bold hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {/* Listing wrapper */}
                <div className="space-y-3">
                  {cart.map((item) => {
                    const subtotal = item.product.price * item.quantity;
                    return (
                      <div 
                        key={item.product.id}
                        className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-all text-left"
                      >
                        
                        {/* Thumbnail indicator placeholder */}
                        <div className="w-11 h-11 rounded-xl bg-slate-200/60 flex-shrink-0 overflow-hidden border border-slate-200">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Calculations */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-2 leading-tight">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] text-blue-650 font-bold uppercase tracking-wider block mt-0.5">
                            {item.product.category}
                          </span>

                          <div className="flex items-center justify-between gap-4 mt-2">
                            {/* Quantity plus - minus block */}
                            <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1">
                              <button 
                                onClick={() => onUpdateQuantity(item.product.id, -1)}
                                className="p-1 rounded text-slate-405 hover:text-slate-800 hover:bg-slate-50 cursor-pointer"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="text-xs font-bold text-slate-800 px-1 font-mono">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity(item.product.id, 1)}
                                className="p-1 rounded text-slate-405 hover:text-slate-800 hover:bg-slate-50 cursor-pointer"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>

                            {/* Subtotal of item */}
                            <span className="font-display font-extrabold text-xs text-slate-900 font-mono">
                              ₨ {formatPrice(subtotal)}
                            </span>
                          </div>

                        </div>

                        {/* Delete single button */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer shrink-0 mt-0.5"
                          title="Erase item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                      </div>
                    );
                  })}
                </div>

              </div>
            )}
          </div>

          {/* Checkout Running Matrix Drawer Footer */}
          {cart.length > 0 && (
            <div className="border-t border-slate-200 bg-slate-50 p-6 space-y-4 shadow-inner">
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Selected Units</span>
                  <span className="font-mono text-slate-800">{totalQuantity}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Karachi Dispatch Rate</span>
                  <span className="font-bold text-blue-600 uppercase text-[9px] tracking-wider leading-none">FREE ABOVE 5,000</span>
                </div>

                <div className="pt-2 border-t border-slate-205 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-800">Total Bill</span>
                  <span className="font-display font-black text-xl text-blue-600 tracking-tight font-mono">
                    ₨ {formatPrice(totalBill)}
                  </span>
                </div>
              </div>

              {/* Direct Ordering Info Box */}
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-left flex gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-600 leading-normal">
                  Your billing parameters are mapped securely according to Pets Dunya rules. Ordering generates a preformatted instant template direct to our WhatsApp hotline!
                </p>
              </div>

              {/* CRITICAL: Order via WhatsApp button */}
              <a
                id="whatsapp-cta-link"
                href={getWhatsAppURL()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-black tracking-wide uppercase shadow-lg shadow-green-200 active:scale-98 transition-transform cursor-pointer border border-[#22bc5b]"
              >
                <div className="p-0.5 bg-white/20 rounded">
                  <Send className="w-4 h-4 text-white fill-current" />
                </div>
                <span>Order via WhatsApp (₨ {formatPrice(totalBill)})</span>
              </a>

              <p className="text-[9px] text-slate-400 font-mono text-center">
                Store Dispatch: 0317-2287931
              </p>

            </div>
          )}

        </div>
      </div>

    </div>
  );
};
