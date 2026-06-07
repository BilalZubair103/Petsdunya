import React from 'react';
import { Cat, Heart, Phone, Mail, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: 'home' | 'products' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer id="global-footer" className="bg-slate-900 border-t border-slate-850 text-slate-300 text-xs mt-16 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          
          {/* Column 1: Store Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Cat className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-white text-base tracking-tight">
                PETS DUNYA
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Providing premium nutrition, organic treats, and clinical liquid support foods. Imported carefully for felines across Pakistan.
            </p>
            <div className="flex items-center gap-1.5 text-rose-400 font-bold">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span className="text-[10px] uppercase font-mono tracking-wider">True Pet Companion Support</span>
            </div>
          </div>

          {/* Column 2: Navigation Shortcuts */}
          <div className="space-y-4">
            <h3 className="font-display font-extrabold text-white text-xs uppercase tracking-widest">
              Catalog Directory
            </h3>
            <ul className="space-y-2 text-slate-405 font-medium">
              <li>
                <button 
                  onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-500 transition-colors pointer-events-auto cursor-pointer"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-500 transition-colors pointer-events-auto cursor-pointer"
                >
                  All 30 Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-500 transition-colors pointer-events-auto cursor-pointer"
                >
                  About Sourcing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-500 transition-colors pointer-events-auto cursor-pointer"
                >
                  Contact Helpdesk
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Warehouse details */}
          <div className="space-y-4">
            <h3 className="font-display font-extrabold text-white text-xs uppercase tracking-widest">
              Warehouse Operating Hours
            </h3>
            <div className="space-y-3 font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Mon - Sun: 11:30 AM to 11:00 PM</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal">
                Sameday dispatch active inside Lahore, Islamabad, and Karachi metropolitan centers.
              </p>
            </div>
          </div>

          {/* Column 4: Address Details */}
          <div className="space-y-4">
            <h3 className="font-display font-extrabold text-white text-xs uppercase tracking-widest">
              Karachi Center Offices
            </h3>
            <ul className="space-y-2.5 text-slate-400 font-medium">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Main DHA Phase 6, Adjacent K-Electric Office, Karachi, Pakistan.</span>
              </li>
              <li className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <a href="tel:03172287931" className="hover:text-yellow-400 text-white font-bold">
                  0317-2287931
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>info@petsdunyacatfood.pk</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Brand Bottom row */}
        <div className="pt-8 mt-12 border-t border-slate-800 text-slate-500 text-[10px] font-medium flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p>© 2026 Pets Dunya Premium Cat Food Directory. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-350 cursor-pointer select-none">Quality Sourcing Metrics</span>
            <span className="hover:text-slate-350 cursor-pointer select-none">Terms</span>
            <span className="hover:text-slate-350 cursor-pointer select-none">Privacy Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
