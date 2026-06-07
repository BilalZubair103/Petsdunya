import React from 'react';
import { Award, ShieldCheck, Heart, Users, MapPin, Truck } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div id="about-view" className="space-y-16 animate-fade-in max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Title block banner */}
      <section className="text-center space-y-4">
        <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-extrabold block">Our Organization</span>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-none">
          Dedication to Pure Nutrition
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
          Sourcing the finest feline diets from around the globe to support long lifetimes of feline companion happiness.
        </p>
      </section>

      {/* Main Core Mission Content Grid */}
      <section className="grid md:grid-cols-2 gap-12 items-center bg-white border border-slate-200 card-shadow p-8 rounded-3xl text-left">
        <div className="space-y-6">
          <h2 className="font-display font-bold text-2xl text-slate-900">
            A Trustworthy Pet Companion Ecosystem
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Inspired directly by the high-grade standards and realistic pricing matrices of Pakistan's premier pet food suppliers, we established this online directory to deliver genuine nutrition fast. 
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every product in our 30-item catalog—from veterinary-approved hydration fluids like Royal Canin Recovery Liquid to everyday favorites like Wanpy and dynamic cheese cushions by Dreamies—is stored in temperate, clean warehouse environments in Karachi before shipping.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-bold text-slate-700">100% Genuine Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-bold text-slate-700">Active Delivery Cities</span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center bg-slate-900 overflow-hidden rounded-2xl p-6 h-64 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80"
            alt="Pet cat"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-blue-900/10" />
          <div className="relative z-10 text-center text-white space-y-2">
            <span className="text-yellow-400 font-extrabold text-xs uppercase tracking-widest">Quality Sourced</span>
            <p className="font-display font-bold text-lg">Direct Imports Since 2018</p>
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="space-y-6">
        <h3 className="font-display font-black text-xl text-slate-900 text-center">Our Core Operating Standards</h3>
        <div className="grid sm:grid-cols-3 gap-6 text-left">
          {[
            {
              icon: <Award className="w-5 h-5 text-blue-600" />,
              title: "Authorized Reselling Only",
              desc: "We completely reject copycats, secondary counterfeits, or near-expiry batches. Our inventory items represent purely verified stock lots."
            },
            {
              icon: <Heart className="w-5 h-5 text-blue-600" />,
              title: "Veterinary-Led Formulation",
              desc: "Our dry lamb kibbles and sensitive digestive wet pouches are balanced precisely for optimal energy ranges."
            },
            {
              icon: <Users className="w-5 h-5 text-blue-600" />,
              title: "Karachi Same-Day Delivery",
              desc: "Dispatching daily. We utilize rapid delivery integrations to make sure your cat's dietary requirements are never delayed."
            }
          ].map((val, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2 card-shadow">
              <div className="p-2 rounded-lg bg-blue-50 w-fit">
                {val.icon}
              </div>
              <h4 className="font-bold text-slate-800 text-sm">{val.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
