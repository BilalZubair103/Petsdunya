import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle, FileText, AlertTriangle, ArrowUpRight, Database, Sparkles, HelpCircle, HardDrive } from 'lucide-react';
import { Product } from '../types';

interface UploadCenterProps {
  onUploadSuccess: (newProducts: Product[]) => void;
  onShowNotification: (msg: string) => void;
}

export const UploadCenter: React.FC<UploadCenterProps> = ({
  onUploadSuccess,
  onShowNotification,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Exactly 20 real premium imported diet catalog items to seed/upload instantly in 1-click
  const premium20DietsDataset = [
    {
      name: "Royal Canin Hairball Intense Care (2 kg)",
      category: "Dry Food",
      price: 4800,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Mera Finest Fit Indoor Optimal (4 kg)",
      category: "Dry Food",
      price: 7200,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Reflex Plus Chicken Kitten (1.5 kg)",
      category: "Dry Food",
      price: 2900,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "BonaCibo Kitten Anchovy & Rice (2 kg)",
      category: "Dry Food",
      price: 4600,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Orijen Original Six Fish Care (1.8 kg)",
      category: "Dry Food",
      price: 12500,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Acana Wild Prairie Super Diet (1.8 kg)",
      category: "Dry Food",
      price: 11000,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Taste of the Wild Canyon River (2 kg)",
      category: "Dry Food",
      price: 6200,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Farmina N&D Pumpkin Quail (1.5 kg)",
      category: "Dry Food",
      price: 5500,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Whiskas Adult Chicken Dry Food (1.2 kg)",
      category: "Dry Food",
      price: 1800,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Josera Catelux Anti-Hairball (2 kg)",
      category: "Dry Food",
      price: 4400,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Nutri Source Pure Vita Salmon (1.5 kg)",
      category: "Dry Food",
      price: 4900,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Kitekat Adult Cat Beef Kibble (1.2 kg)",
      category: "Dry Food",
      price: 1200,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1561037404-61cd96ad615b?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Schesir Wet Chicken with Aloe Vera (85g)",
      category: "Wet Food",
      price: 390,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1504595403659-9088ce801e29?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "GimCat ShinyCat Chicken in Jelly (70g)",
      category: "Wet Food",
      price: 350,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Brit Premium Meat Sausage for Cats (180g)",
      category: "Wet Food",
      price: 450,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1537151608828-ea2b117b6281?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Monge Natural Tuna & Salmon Can (80g)",
      category: "Wet Food",
      price: 380,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Me-O Creamy Salmon Treats (4 sticks)",
      category: "Treats",
      price: 490,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Vitakraft Liquid Treat with Omega 3 (5pcs)",
      category: "Treats",
      price: 550,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Trixie Premio Freeze Dried Chicken Cubes (50g)",
      category: "Treats",
      price: 890,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Beaphar Calming Treats for Stress Relief",
      category: "Treats",
      price: 990,
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=500&auto=format&fit=crop&q=80"
    }
  ];

  // POST action dispatcher
  const dispatchProductsToAPI = async (itemsList: any[]) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    try {
      const res = await fetch('/api/products/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: itemsList }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(data.message || `Loaded ${itemsList.length} products to inventory list successfully!`);
        onShowNotification(`Imported ${data.products.length} products to your active database!`);
        
        // Refetch all active inventory elements to refresh App context
        const responseProducts = await fetch('/api/products');
        const updatedProducts = await responseProducts.json();
        onUploadSuccess(updatedProducts);
      } else {
        setErrorMsg(data.message || 'Transmission failed. Verify structure formatting.');
      }
    } catch {
      setErrorMsg('Failed to establish API connection to bulk uploader.');
    } finally {
      setLoading(false);
    }
  };

  // Click Trigger to instantly upload the preloaded 20 items list
  const handleAutoLoad20Diets = () => {
    dispatchProductsToAPI(premium20DietsDataset);
  };

  // Drag listeners
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      parseAndUploadFile(files[0]);
    }
  };

  // Direct manual file pick
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      parseAndUploadFile(files[0]);
    }
  };

  // Parse product input values
  const parseAndUploadFile = (file: File) => {
    if (!file.name.endsWith('.json')) {
      setErrorMsg('Please upload a valid structured .json dictionary list.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const listToUpload = Array.isArray(parsed) ? parsed : (parsed.products || [parsed]);
        
        if (listToUpload.length === 0) {
          setErrorMsg('No items parsed inside file dictionary list.');
          return;
        }

        dispatchProductsToAPI(listToUpload);
      } catch {
        setErrorMsg('Malformed JSON file. Ensure correct braces formatting.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs text-left space-y-6">
      
      {/* Upper info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-extrabold block">Authorized Stocks</span>
          <h3 className="font-display font-extrabold text-xl text-slate-900 mt-1 flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-blue-600" />
            <span>Product Sourcing & Bulk Uploader</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Populate your Pakistan warehouse database. Supports custom JSON file drags or 1-click preset loaders.
          </p>
        </div>

        {/* 1-Click loading trigger */}
        <button
          onClick={handleAutoLoad20Diets}
          disabled={loading}
          className="relative inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          <span>Auto-Upload 20 Premium Diets</span>
        </button>
      </div>

      {/* Info notices */}
      {errorMsg && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 text-xs p-3.5 rounded-xl border border-red-200">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2.5 bg-emerald-50 text-emerald-700 text-xs p-3.5 rounded-xl border border-emerald-250">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Drag Zone & Manual Click Loader */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3.5 ${
          isDragging 
            ? 'border-blue-600 bg-blue-50/50' 
            : 'border-slate-300 bg-slate-50 hover:bg-slate-100/60 hover:border-slate-400'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          className="hidden"
        />

        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
          <UploadCloud className="w-6 h-6 text-blue-600" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-800">
            {isDragging ? 'Drop your catalog JSON files right here' : 'Drag & Drop a JSON file or Click to Browse'}
          </p>
          <p className="text-[11px] text-slate-500">
            Supports standardized inventory JSON format containing array of diet objects
          </p>
        </div>

        {loading && (
          <div className="absolute inset-x-0 bottom-0 py-2.5 bg-blue-600/90 rounded-b-xl text-white text-[10px] font-bold text-center flex items-center justify-center gap-2 animate-pulse">
            <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
            <span>transmitting product directory parameters to server...</span>
          </div>
        )}
      </div>

      {/* Explanatory formatting matrix section */}
      <div className="bg-slate-50 p-4.5 rounded-2xl space-y-3">
        <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 leading-none">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Standard JSON File Structure Help Guide</span>
        </h4>
        <pre className="text-[10px] text-slate-650 bg-white border border-slate-200 rounded-xl p-3 shadow-xs font-mono overflow-x-auto leading-relaxed text-left">
{`{
  "products": [
    {
      "name": "Royal Canin Hairball Intense Care (2 kg)",
      "category": "Dry Food",
      "price": 4800,
      "imageUrl": "https://images.unsplash.com/...placeholder"
    }
  ]
}`}
        </pre>
        <p className="text-[10px] text-slate-500 leading-normal">
          Assigns auto-increment identifiers inside server storage immediately when imported. Fresh imports instantly become buyable across checkout modules on success.
        </p>
      </div>

    </div>
  );
};
