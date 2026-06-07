import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Hardcoded Array of exactly 30 Cat Products cleanly categorised
const products = [
  // DRY FOOD (1 to 12)
  {
    id: 1,
    name: "Nourvet Premium Cat Food (1 kg)",
    category: "Dry Food",
    price: 1100,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Fluffy Cat Food Premium",
    category: "Dry Food",
    price: 790,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Reflex Multicolor Adult Cat Food (2 kg)",
    category: "Dry Food",
    price: 4000,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "BonaCibo Adult Cat Lamb & Rice (2 kg)",
    category: "Dry Food",
    price: 4350,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Royal Canin Persian Adult (400g)",
    category: "Dry Food",
    price: 2700,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    name: "Royal Canin Mother & Babycat (400g)",
    category: "Dry Food",
    price: 2800,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 7,
    name: "Birbo Cat Food Blend Mix (1 kg)",
    category: "Dry Food",
    price: 1500,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 8,
    name: "Bonnie Adult Cat Lamb & Rice (1.5 kg)",
    category: "Dry Food",
    price: 2500,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 9,
    name: "Econature Plus Chicken Flavor (15kg Bulk)",
    category: "Dry Food",
    price: 19500,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 10,
    name: "Mera Finest Fit Hair & Skin (1.5 kg)",
    category: "Dry Food",
    price: 3400,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1561037404-61cd96ad615b?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 11,
    name: "Taste of the Wild Rocky Mountain (2 kg)",
    category: "Dry Food",
    price: 6000,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 12,
    name: "Farmina Matisse Chicken & Rice (1.5 kg)",
    category: "Dry Food",
    price: 2400,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&auto=format&fit=crop&q=80"
  },

  // WET FOOD (13 to 21)
  {
    id: 13,
    name: "Wanpy Adult Cat Real Meat Chicken & Shrimp Pouch (85g)",
    category: "Wet Food",
    price: 260,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1504595403659-9088ce801e29?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 14,
    name: "Wanpy Adult Cat Real Meat Chicken & Codfish Pouch (85g)",
    category: "Wet Food",
    price: 260,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 15,
    name: "Royal Canin Sensitivity Control Wet Pouch (85g)",
    category: "Wet Food",
    price: 430,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1537151608828-ea2b117b6281?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 16,
    name: "Gourmet Gold Tin Wet Food for Cats",
    category: "Wet Food",
    price: 375,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 17,
    name: "Maybel Elite Premium Tin Chicken & Vegetable (400g)",
    category: "Wet Food",
    price: 550,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 18,
    name: "Felicia Wet Pouches Food for Kittens in Jelly",
    category: "Wet Food",
    price: 350,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 19,
    name: "Whiskas Fish Selection in Jelly Pouch",
    category: "Wet Food",
    price: 280,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 20,
    name: "Royal Canin Renal Liquid Support Nutrition (200ml)",
    category: "Wet Food",
    price: 3000,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 21,
    name: "Royal Canin Recovery Liquid for Cats/Dogs (200ml)",
    category: "Wet Food",
    price: 2800,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=500&auto=format&fit=crop&q=80"
  },

  // TREATS (22 to 30)
  {
    id: 22,
    name: "Wanpy Creamy Treats Chicken Flavor (5 Sticks Pack)",
    category: "Treats",
    price: 550,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 23,
    name: "Felix Creamy Treat Chicken Pack",
    category: "Treats",
    price: 600,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 24,
    name: "Felix Crispies Beef & Chicken (45g)",
    category: "Treats",
    price: 500,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 25,
    name: "Felix Goody Bags Original Mix",
    category: "Treats",
    price: 500,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 26,
    name: "Whiskas Relax and Unwind Treats",
    category: "Treats",
    price: 650,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1574158622643-69d34d72650a?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 27,
    name: "Whiskas DentaBites Cat Treats",
    category: "Treats",
    price: 650,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1501820488136-72669149e0d4?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 28,
    name: "Dreamies Cat Treats Cheese (200g)",
    category: "Treats",
    price: 1600,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1511044568932-338cba0ad801?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 29,
    name: "Dreamies Creamy with Tasty Chicken (4x10g)",
    category: "Treats",
    price: 650,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 30,
    name: "Lollipop Ranova Cat Freeze-Dried Treat",
    category: "Treats",
    price: 150,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=500&auto=format&fit=crop&q=80"
  }
];

// GET /api/products: supports optional Query Category filter (?category=Dry Food) and ?featured=true
app.get("/api/products", (req, res) => {
  const { category, featured } = req.query;
  let result = [...products];

  if (category) {
    result = result.filter(p => p.category.toLowerCase() === String(category).toLowerCase());
  }

  if (featured === "true") {
    result = result.filter(p => p.featured === true);
  }

  res.json(result);
});

// POST /api/contact: receives Name, Email, and message and logs them to terminal console
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: "Please include all required details: name, email, and message." 
    });
  }

  console.log("-----------------------------------------");
  console.log("☎️ RECEIVED NEW CONTACT FORM ENVELOPE:");
  console.log(`👤 Name: ${name}`);
  console.log(`✉️ Email: ${email}`);
  console.log(`💬 Message: ${message}`);
  console.log("-----------------------------------------");

  res.json({ 
    success: true, 
    message: "Thank you! Your message was transmitted successfully." 
  });
});

// Serve Frontend client assets via custom Express + Vite hybrid middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Express API Server Active] Listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
