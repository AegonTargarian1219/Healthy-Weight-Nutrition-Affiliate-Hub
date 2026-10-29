// NutriiFit Core Engine
let currentUnit = 'metric';
let currentCountry = 'IN';

let currentBMIData = {
  bmi: 22.2,
  status: 'normal',
  healthyMinKg: 56.7,
  healthyMaxKg: 76.3,
  healthyMinLbs: 125.0,
  healthyMaxLbs: 168.2
};

// Country Configurations & Currency Formats
const countryConfig = {
  IN: {
    name: "India",
    flag: "🇮🇳",
    currency: "₹",
    amazonTag: "nutriifitin-21",
    retailers: [
      { name: "Amazon Fresh & Pantry (India)", icon: "fa-brands fa-amazon", desc: "Same day fast delivery with Prime", color: "text-amber-400", getUrl: q => `https://www.amazon.in/s?k=${encodeURIComponent(q)}&tag=nutriifitin-21` },
      { name: "Blinkit / Zepto / Instamart", icon: "fa-solid fa-bolt", desc: "10-minute grocery delivery", color: "text-emerald-400", getUrl: q => `https://blinkit.com/s/?q=${encodeURIComponent(q)}` },
      { name: "HealthKart / MyProtein India", icon: "fa-solid fa-dumbbell", desc: "Verified 100% authentic gym nutrition", color: "text-blue-400", getUrl: q => `https://www.healthkart.com/search?q=${encodeURIComponent(q)}` }
    ]
  },
  US: {
    name: "United States",
    flag: "🇺🇸",
    currency: "$",
    amazonTag: "nutriifitus-20",
    retailers: [
      { name: "Amazon Fresh & Whole Foods (US)", icon: "fa-brands fa-amazon", desc: "Same day delivery with Prime", color: "text-amber-400", getUrl: q => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=nutriifitus-20` },
      { name: "Instacart Local Delivery", icon: "fa-solid fa-carrot", desc: "Delivered in under 2 hours", color: "text-emerald-400", getUrl: q => `https://www.instacart.com/store/s?k=${encodeURIComponent(q)}` },
      { name: "iHerb / GNC", icon: "fa-solid fa-leaf", desc: "Lab-tested supplements & superfoods", color: "text-blue-400", getUrl: q => `https://www.iherb.com/search?kw=${encodeURIComponent(q)}` }
    ]
  },
  UK: {
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "£",
    amazonTag: "nutriifituk-21",
    retailers: [
      { name: "Amazon UK Fresh", icon: "fa-brands fa-amazon", desc: "Next day UK delivery", color: "text-amber-400", getUrl: q => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}&tag=nutriifituk-21` },
      { name: "Sainsbury's / Tesco Online", icon: "fa-solid fa-basket-shopping", desc: "Fresh groceries straight to door", color: "text-emerald-400", getUrl: q => `https://www.tesco.com/groceries/en-GB/search?query=${encodeURIComponent(q)}` },
      { name: "MyProtein UK / Holland & Barrett", icon: "fa-solid fa-dumbbell", desc: "Europe's leading gym nutrition", color: "text-blue-400", getUrl: q => `https://www.myprotein.com/elysium.search?search=${encodeURIComponent(q)}` }
    ]
  },
  CA: {
    name: "Canada",
    flag: "🇨🇦",
    currency: "CA$",
    amazonTag: "nutriifitca-20",
    retailers: [
      { name: "Amazon Canada", icon: "fa-brands fa-amazon", desc: "Fast Prime shipping across provinces", color: "text-amber-400", getUrl: q => `https://www.amazon.ca/s?k=${encodeURIComponent(q)}&tag=nutriifitca-20` },
      { name: "Instacart Canada", icon: "fa-solid fa-carrot", desc: "Same-day Canadian local grocery delivery", color: "text-emerald-400", getUrl: q => `https://www.instacart.ca/store/s?k=${encodeURIComponent(q)}` },
      { name: "Popeye's Supplements / iHerb", icon: "fa-solid fa-dumbbell", desc: "Top Canadian fitness nutrition", color: "text-blue-400", getUrl: q => `https://www.iherb.com/search?kw=${encodeURIComponent(q)}` }
    ]
  },
  AU: {
    name: "Australia",
    flag: "🇦🇺",
    currency: "A$",
    amazonTag: "nutriifitau-22",
    retailers: [
      { name: "Amazon Australia", icon: "fa-brands fa-amazon", desc: "Prime fast delivery in AU", color: "text-amber-400", getUrl: q => `https://www.amazon.com.au/s?k=${encodeURIComponent(q)}&tag=nutriifitau-22` },
      { name: "Woolworths / Coles Online", icon: "fa-solid fa-basket-shopping", desc: "Fresh Australian produce", color: "text-emerald-400", getUrl: q => `https://www.woolworths.com.au/shop/search/products?searchTerm=${encodeURIComponent(q)}` },
      { name: "Bulk Nutrients Australia", icon: "fa-solid fa-dumbbell", desc: "Pure Australian sports supplements", color: "text-blue-400", getUrl: q => `https://www.bulknutrients.com.au/search?q=${encodeURIComponent(q)}` }
    ]
  },
  AE: {
    name: "UAE",
    flag: "🇦🇪",
    currency: "AED ",
    amazonTag: "nutriifitae-21",
    retailers: [
      { name: "Amazon UAE", icon: "fa-brands fa-amazon", desc: "Next-day delivery across Emirates", color: "text-amber-400", getUrl: q => `https://www.amazon.ae/s?k=${encodeURIComponent(q)}&tag=nutriifitae-21` },
      { name: "Talabat Mart / Noon Minutes", icon: "fa-solid fa-bolt", desc: "Ultra-fast delivery in 15 mins", color: "text-emerald-400", getUrl: q => `https://www.noon.com/uae-en/search/?q=${encodeURIComponent(q)}` },
      { name: "Life Pharmacy / Dr. Nutrition", icon: "fa-solid fa-dumbbell", desc: "Certified UAE sports supplements", color: "text-blue-400", getUrl: q => `https://www.lifepharmacy.com/search?query=${encodeURIComponent(q)}` }
    ]
  }
};

// Localized Pricing Helper
function formatPrice(usdPrice) {
  const conf = countryConfig[currentCountry];
  switch(currentCountry) {
    case 'IN': return `₹${Math.round(usdPrice * 86)}`;
    case 'UK': return `£${(usdPrice * 0.79).toFixed(2)}`;
    case 'CA': return `CA$${(usdPrice * 1.36).toFixed(2)}`;
    case 'AU': return `A$${(usdPrice * 1.52).toFixed(2)}`;
    case 'AE': return `${(usdPrice * 3.67).toFixed(1)} AED`;
    default: return `$${usdPrice.toFixed(2)}`;
  }
}

// Targeted Dietary Nutrition Database
const nutritionDatabase = {
  underweight: {
    title: "Clean Caloric Surplus (+350 to 500 kcal)",
    tag: "Lean Mass Building",
    desc: "Focus on nutrient-dense complex carbohydrates, essential recovery fats, and bioavailable protein to build lean muscle safely.",
    foods: [
      { name: "Avocado", icon: "🥑", benefit: "Monounsaturated fats & healthy calorie density", basePrice: 2.2, query: "fresh organic avocados" },
      { name: "Rolled Oats", icon: "🥣", benefit: "Slow-digesting carbs & beta-glucan", basePrice: 4.5, query: "organic rolled oats" },
      { name: "Natural Peanut Butter", icon: "🥜", benefit: "Caloric density & plant-based proteins", basePrice: 5.5, query: "natural creamy peanut butter no sugar" },
      { name: "Wild Caught Salmon / Paneer", icon: "🐟", benefit: "High complete protein & Omega-3 recovery fats", basePrice: 12.0, query: "wild caught salmon fillets" },
      { name: "Sweet Potatoes", icon: "🍠", benefit: "Muscle glycogen restoration & potassium", basePrice: 2.0, query: "organic sweet potatoes" },
      { name: "Greek Yogurt / Curd", icon: "🥛", benefit: "Casein protein & digestive gut probiotics", basePrice: 4.0, query: "plain greek yogurt full fat" }
    ]
  },
  normal: {
    title: "Metabolic Maintenance & Micronutrient Balance",
    tag: "Athletic Longevity",
    desc: "Maintain your optimal body mass with antioxidant-dense whole foods, anti-inflammatory greens, and lean proteins.",
    foods: [
      { name: "Organic Crisp Apples", icon: "🍎", benefit: "Soluble dietary pectin & heart polyphenols", basePrice: 2.8, query: "crisp organic apples" },
      { name: "Fresh Broccoli", icon: "🥦", benefit: "Cruciferous sulforaphane, Vitamin C & fiber", basePrice: 2.1, query: "fresh broccoli florets" },
      { name: "Baby Spinach Greens", icon: "🥗", benefit: "Bio-iron, endurance nitrates & Vitamin K", basePrice: 3.2, query: "organic baby spinach" },
      { name: "Farm Fresh Eggs", icon: "🥚", benefit: "Complete bioavailable amino acids & choline", basePrice: 4.0, query: "farm fresh organic eggs" },
      { name: "Raw Walnuts & Almonds", icon: "🌰", benefit: "Cognitive brain health & zinc minerals", basePrice: 7.5, query: "raw organic walnuts and almonds" },
      { name: "Fresh Blueberries", icon: "🫐", benefit: "Antioxidants for accelerated muscle recovery", basePrice: 4.8, query: "fresh organic blueberries" }
    ]
  },
  overweight: {
    title: "High-Volume, Fiber-Rich Caloric Deficit (-350 to 500 kcal)",
    tag: "Fat Loss & Satiety",
    desc: "Maximize fullness and satiety without caloric density using cruciferous veggies, lean proteins, and thermogenic teas.",
    foods: [
      { name: "Broccoli & Cauliflower", icon: "🥦", benefit: "High meal volume, rich fiber & hunger control", basePrice: 2.2, query: "organic broccoli cauliflower fresh" },
      { name: "Crisp Cucumbers", icon: "🥒", benefit: "96% water hydration with zero calorie bloat", basePrice: 1.1, query: "fresh english cucumbers" },
      { name: "Green Apples (Granny Smith)", icon: "🍏", benefit: "Low glycemic index and sustained digestive fullness", basePrice: 2.5, query: "granny smith organic green apples" },
      { name: "Skinless Chicken Breast / Tofu", icon: "🍗", benefit: "Highest thermic effect of food (TEF) & pure protein", basePrice: 6.5, query: "skinless chicken breast or firm tofu" },
      { name: "Japanese Ceremonial Matcha", icon: "🍵", benefit: "EGCG polyphenols to boost basal fat oxidation", basePrice: 8.9, query: "organic ceremonial matcha green tea" },
      { name: "Black Chia Seeds", icon: "🌱", benefit: "Hydration gel binding and high soluble fiber", basePrice: 5.8, query: "organic black chia seeds" }
    ]
  }
};

// ========================================================
// DIE-CUT STICKER GENERATOR: BODYBUILDER ATHLETE STICKERS
// With bold white outline, die-cut outer layer, muscular shading
// ========================================================

function generateDumbbellCurlSticker() {
  return `
  <div class="sticker-container">
    <svg viewBox="0 0 200 200" class="w-40 h-40 die-cut-sticker">
      <!-- White Die-Cut Background Path (Sticker Border) -->
      <filter id="stickerShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
      
      <g filter="url(#stickerShadow)">
        <!-- Outer White Sticker Base -->
        <path d="M 60,35 C 45,35 35,48 40,70 C 25,75 10,95 20,120 C 30,145 60,150 75,150 L 75,190 C 75,198 125,198 125,190 L 125,150 C 145,150 175,145 180,120 C 185,95 170,75 160,70 C 165,48 155,35 140,35 C 130,20 70,20 60,35 Z" fill="#ffffff" stroke="#ffffff" stroke-width="12" stroke-linejoin="round" />
        
        <!-- Torso, Shorts & Head Base -->
        <!-- Black Athletic Cap & Hair -->
        <path d="M 72,42 C 72,32 82,25 98,25 C 114,25 125,32 125,42 C 120,40 100,38 72,42 Z" fill="#0f172a" />
        <path d="M 70,40 L 52,43 C 48,44 48,49 54,50 L 72,49 Z" fill="#0f172a" /> <!-- Cap Visor -->
        
        <!-- Face & Neck Profile -->
        <path d="M 72,44 C 70,52 74,60 78,63 L 78,72 L 88,72 L 90,62 C 94,62 98,58 98,52 C 98,48 94,45 92,44 Z" fill="#fbd2a4" />
        <path d="M 76,50 L 80,50 L 78,54 Z" fill="#0f172a" /> <!-- Eye -->
        <path d="M 90,48 C 92,48 94,51 92,54" fill="none" stroke="#0f172a" stroke-width="1.5" /> <!-- Ear -->
        <path d="M 88,60 C 90,68 102,72 108,72 L 110,62" fill="#fbd2a4" /> <!-- Neck back -->

        <!-- Muscular Chest & Abs Torso -->
        <path d="M 72,72 C 60,80 58,105 60,135 L 140,135 C 142,105 140,80 128,72 C 118,74 100,74 90,72 Z" fill="#fbd2a4" />
        <!-- Chest Pectorals Definition -->
        <path d="M 100,74 L 100,102 M 72,92 C 84,97 96,96 100,102 C 104,96 116,97 128,92" fill="none" stroke="#d49b6a" stroke-width="2.5" stroke-linecap="round" />
        <!-- Six-Pack Abs Lines -->
        <path d="M 100,102 L 100,132 M 84,108 C 92,111 96,111 100,111 C 104,111 108,111 116,108 M 84,120 C 92,123 96,123 100,123 C 104,123 108,123 116,120" fill="none" stroke="#d49b6a" stroke-width="2" stroke-linecap="round" />
        <!-- Dark Gym Shorts with waistband -->
        <path d="M 60,134 L 140,134 L 136,172 L 102,172 L 100,148 L 98,172 L 64,172 Z" fill="#090d16" />
        <rect x="62" y="134" width="76" height="5" fill="#f59e0b" rx="2" /> <!-- Gold Belt Stripe -->

        <!-- Left Arm Hanging with Dumbbell -->
        <g>
          <path d="M 128,76 C 138,82 144,96 142,115 L 138,138 L 148,138 L 152,112 C 152,94 144,80 134,74 Z" fill="#fbd2a4" />
          <!-- Heavy Dumbbell in Left Hand -->
          <ellipse cx="144" cy="145" rx="14" ry="7" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
          <ellipse cx="144" cy="148" rx="11" ry="5" fill="#cbd5e1" />
          <rect x="142" y="137" width="4" height="12" fill="#64748b" />
          <ellipse cx="144" cy="138" rx="14" ry="7" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
        </g>

        <!-- Right Movable Arm performing Bicep Curl (Class .anim-curl-arm) -->
        <g class="anim-curl-arm">
          <!-- Shoulder Deltoid -->
          <circle cx="70" cy="80" r="12" fill="#fbd2a4" />
          <!-- Bicep & Forearm connected to Dumbbell -->
          <path d="M 70,80 C 60,90 52,106 50,118 C 45,116 38,110 36,98 C 44,92 52,80 70,80 Z" fill="#fbd2a4" />
          <path d="M 50,118 C 46,128 35,135 25,130 C 22,120 28,105 36,98 Z" fill="#fbd2a4" />
          <!-- Muscle Highlights -->
          <path d="M 54,95 Q 46,102 44,112" fill="none" stroke="#d49b6a" stroke-width="2" stroke-linecap="round" />
          <!-- Curled Dumbbell -->
          <g transform="translate(18, 105)">
            <ellipse cx="10" cy="10" rx="13" ry="16" fill="#0f172a" />
            <ellipse cx="10" cy="10" rx="9" ry="12" fill="#475569" />
            <circle cx="10" cy="10" r="4" fill="#f59e0b" />
            <rect x="8" y="2" width="4" height="16" fill="#cbd5e1" />
          </g>
        </g>
      </g>
    </svg>
  </div>
  `;
}

function generateSquatSticker() {
  return `
  <div class="sticker-container">
    <svg viewBox="0 0 200 200" class="w-40 h-40 die-cut-sticker">
      <filter id="squatShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
      <g filter="url(#squatShadow)">
        <!-- Outer White Sticker Base -->
        <path d="M 20,40 L 180,40 C 190,40 190,70 180,70 L 140,70 L 145,185 C 145,195 55,195 55,185 L 60,70 L 20,70 C 10,70 10,40 20,40 Z" fill="#ffffff" stroke="#ffffff" stroke-width="12" stroke-linejoin="round" />
        
        <!-- Animated Squatter Group (Class .anim-squat) -->
        <g class="anim-squat">
          <!-- Heavy Olympic Barbell on Traps -->
          <rect x="22" y="52" width="156" height="6" fill="#94a3b8" rx="2" />
          <!-- Red & Gold Weight Plates -->
          <rect x="26" y="32" width="10" height="46" fill="#ef4444" stroke="#0f172a" stroke-width="2" rx="3" />
          <rect x="38" y="38" width="6" height="34" fill="#f59e0b" stroke="#0f172a" stroke-width="2" rx="2" />
          <rect x="164" y="32" width="10" height="46" fill="#ef4444" stroke="#0f172a" stroke-width="2" rx="3" />
          <rect x="156" y="38" width="6" height="34" fill="#f59e0b" stroke="#0f172a" stroke-width="2" rx="2" />

          <!-- Athlete Head & Cap -->
          <circle cx="100" cy="45" r="12" fill="#fbd2a4" />
          <path d="M 88,43 C 88,32 112,32 112,43 Z" fill="#0f172a" />
          <path d="M 88,43 L 78,45 L 88,48 Z" fill="#0f172a" /> <!-- Cap Visor -->

          <!-- Muscular Back & Trapezius -->
          <path d="M 80,55 C 80,55 90,52 100,52 C 110,52 120,55 120,55 L 126,88 L 74,88 Z" fill="#fbd2a4" />
          <path d="M 100,53 L 100,88" stroke="#d49b6a" stroke-width="2" />
          
          <!-- Arm gripping the bar -->
          <path d="M 76,55 L 62,54 L 64,68 L 74,85" fill="none" stroke="#fbd2a4" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 124,55 L 138,54 L 136,68 L 126,85" fill="none" stroke="#fbd2a4" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />

          <!-- Gym Compression Shorts -->
          <path d="M 74,88 L 126,88 L 132,120 L 68,120 Z" fill="#0f172a" />
          <rect x="72" y="88" width="56" height="4" fill="#ef4444" />

          <!-- Quad Thighs & Calves Squatting -->
          <path d="M 72,120 L 58,150 L 68,180" fill="none" stroke="#fbd2a4" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 128,120 L 142,150 L 132,180" fill="none" stroke="#fbd2a4" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Weightlifting Shoes -->
          <rect x="60" y="176" width="18" height="8" fill="#f59e0b" rx="3" stroke="#0f172a" stroke-width="1.5" />
          <rect x="122" y="176" width="18" height="8" fill="#f59e0b" rx="3" stroke="#0f172a" stroke-width="1.5" />
        </g>
      </g>
    </svg>
  </div>
  `;
}

function generateBenchPressSticker() {
  return `
  <div class="sticker-container">
    <svg viewBox="0 0 200 200" class="w-40 h-40 die-cut-sticker">
      <filter id="benchShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
      <g filter="url(#benchShadow)">
        <!-- White Die Cut Border -->
        <path d="M 20,30 L 180,30 C 190,30 190,170 180,170 L 20,170 C 10,170 10,30 20,30 Z" fill="#ffffff" stroke="#ffffff" stroke-width="10" rx="20" />
        
        <!-- Gym Bench Foundation -->
        <rect x="35" y="125" width="130" height="12" fill="#0f172a" rx="4" />
        <rect x="50" y="137" width="10" height="35" fill="#475569" />
        <rect x="140" y="137" width="10" height="35" fill="#475569" />

        <!-- Athlete Lying on Bench -->
        <circle cx="50" cy="116" r="10" fill="#fbd2a4" />
        <path d="M 45,108 C 45,100 58,100 58,108 Z" fill="#0f172a" /> <!-- Head Cap -->
        <!-- Torso Arch -->
        <path d="M 60,118 C 75,110 95,110 115,122 L 115,128 L 60,128 Z" fill="#fbd2a4" />
        <path d="M 80,113 C 86,116 95,116 100,115" stroke="#d49b6a" stroke-width="2" fill="none" />
        <!-- Leg planted on floor -->
        <path d="M 115,125 L 135,135 L 140,165" fill="none" stroke="#0f172a" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
        <rect x="135" y="162" width="16" height="7" fill="#f59e0b" rx="2" />

        <!-- Movable Bench Barbell with Arms (Class .anim-bench-bar) -->
        <g class="anim-bench-bar">
          <!-- Arms Pushing Bar -->
          <path d="M 82,118 L 86,85 L 98,62" fill="none" stroke="#fbd2a4" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 104,118 L 102,85 L 98,62" fill="none" stroke="#fbd2a4" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Barbell -->
          <rect x="25" y="58" width="150" height="5" fill="#94a3b8" rx="2" />
          <rect x="30" y="40" width="8" height="40" fill="#3b82f6" stroke="#0f172a" stroke-width="1.5" rx="2" />
          <rect x="40" y="44" width="6" height="32" fill="#ef4444" stroke="#0f172a" stroke-width="1.5" rx="2" />
          <rect x="162" y="40" width="8" height="40" fill="#3b82f6" stroke="#0f172a" stroke-width="1.5" rx="2" />
          <rect x="154" y="44" width="6" height="32" fill="#ef4444" stroke="#0f172a" stroke-width="1.5" rx="2" />
        </g>
      </g>
    </svg>
  </div>
  `;
}

function generateDeadliftSticker() {
  return `
  <div class="sticker-container">
    <svg viewBox="0 0 200 200" class="w-40 h-40 die-cut-sticker">
      <filter id="dlShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
      <g filter="url(#dlShadow)">
        <!-- Outer White Sticker Base -->
        <path d="M 40,20 C 160,20 180,50 180,180 C 180,195 20,195 20,180 C 20,50 30,20 40,20 Z" fill="#ffffff" stroke="#ffffff" stroke-width="12" stroke-linejoin="round" />

        <!-- Legs & Feet planted firmly -->
        <path d="M 85,120 L 85,178 M 115,120 L 115,178" stroke="#0f172a" stroke-width="14" stroke-linecap="round" />
        <rect x="74" y="174" width="20" height="8" fill="#f59e0b" rx="2" />
        <rect x="106" y="174" width="20" height="8" fill="#f59e0b" rx="2" />

        <!-- Hinged Torso doing RDL (Class .anim-torso-hinge) -->
        <g class="anim-torso-hinge">
          <!-- Torso -->
          <path d="M 82,122 L 72,70 L 116,66 L 114,122 Z" fill="#fbd2a4" />
          <!-- Head with backward cap -->
          <circle cx="106" cy="48" r="12" fill="#fbd2a4" />
          <path d="M 96,44 C 96,35 118,35 118,44 Z" fill="#0f172a" />
          <path d="M 116,42 L 126,40 L 120,47 Z" fill="#0f172a" /> <!-- Cap Visor Backward -->
          
          <!-- Back muscle lines -->
          <path d="M 92,72 L 96,112" stroke="#d49b6a" stroke-width="2" />
          
          <!-- Arms holding barbell -->
          <path d="M 80,72 L 78,115 L 78,135" fill="none" stroke="#fbd2a4" stroke-width="7" stroke-linecap="round" />
          <!-- Barbell -->
          <rect x="25" y="132" width="130" height="6" fill="#94a3b8" rx="2" />
          <circle cx="34" cy="135" r="16" fill="#10b981" stroke="#0f172a" stroke-width="2" />
          <circle cx="34" cy="135" r="6" fill="#0f172a" />
          <circle cx="146" cy="135" r="16" fill="#10b981" stroke="#0f172a" stroke-width="2" />
          <circle cx="146" cy="135" r="6" fill="#0f172a" />
        </g>
      </g>
    </svg>
  </div>
  `;
}

function generateCardioSticker() {
  return `
  <div class="sticker-container">
    <svg viewBox="0 0 200 200" class="w-40 h-40 die-cut-sticker">
      <filter id="cardioShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
      <g filter="url(#cardioShadow)">
        <path d="M 30,30 L 170,30 C 185,30 185,175 170,175 L 30,175 C 15,175 15,30 30,30 Z" fill="#ffffff" stroke="#ffffff" stroke-width="12" rx="24" />
        
        <!-- Treadmill / Incline Platform -->
        <path d="M 35,160 L 165,130" stroke="#475569" stroke-width="8" stroke-linecap="round" />
        <rect x="150" y="90" width="8" height="45" fill="#334155" />
        <rect x="140" y="86" width="24" height="6" fill="#f59e0b" rx="2" /> <!-- Console -->

        <!-- Movable Runner Athlete (Class .anim-cardio-run) -->
        <g class="anim-cardio-run">
          <!-- Head & Cap -->
          <circle cx="95" cy="55" r="11" fill="#fbd2a4" />
          <path d="M 85,52 C 85,42 105,42 105,52 Z" fill="#0f172a" />
          <path d="M 85,50 L 76,51 L 84,54 Z" fill="#0f172a" />
          <!-- Torso Incline Lean -->
          <path d="M 94,66 L 82,108" stroke="#fbd2a4" stroke-width="16" stroke-linecap="round" />
          <path d="M 82,108 L 78,124" stroke="#0f172a" stroke-width="15" stroke-linecap="round" /> <!-- Shorts -->
          <!-- Running Legs -->
          <path d="M 80,122 L 62,142 L 50,154" fill="none" stroke="#fbd2a4" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 80,122 L 105,135 L 125,136" fill="none" stroke="#fbd2a4" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Shoes -->
          <rect x="42" y="150" width="14" height="6" fill="#ef4444" rx="2" />
          <rect x="122" y="133" width="14" height="6" fill="#ef4444" rx="2" />
          <!-- Pumping Arms -->
          <path d="M 92,72 L 72,82 L 64,74" fill="none" stroke="#fbd2a4" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 92,72 L 112,82 L 120,95" fill="none" stroke="#fbd2a4" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>
    </svg>
  </div>
  `;
}

function generatePushUpSticker() {
  return `
  <div class="sticker-container">
    <svg viewBox="0 0 200 200" class="w-40 h-40 die-cut-sticker">
      <filter id="puShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
      <g filter="url(#puShadow)">
        <path d="M 25,50 L 175,50 C 185,50 185,170 175,170 L 25,170 C 15,170 15,50 25,50 Z" fill="#ffffff" stroke="#ffffff" stroke-width="12" rx="20" />
        
        <!-- Floor Mat -->
        <rect x="35" y="145" width="130" height="6" fill="#1e293b" rx="2" />

        <!-- Movable Push-Up Plank Body (Class .anim-pushup-body) -->
        <g class="anim-pushup-body">
          <circle cx="58" cy="95" r="10" fill="#fbd2a4" />
          <path d="M 50,91 C 50,83 62,83 62,91 Z" fill="#0f172a" />
          <!-- Muscular Torso & Legs In Plank Line -->
          <path d="M 64,102 L 115,116 L 150,135" fill="none" stroke="#fbd2a4" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 100,112 L 125,124" stroke="#0f172a" stroke-width="14" stroke-linecap="round" /> <!-- Shorts -->
          <!-- Arms In Pushup Position -->
          <path d="M 72,104 L 72,145" stroke="#fbd2a4" stroke-width="8" stroke-linecap="round" />
          <!-- Hand planted -->
          <rect x="68" y="142" width="10" height="4" fill="#0f172a" rx="1" />
          <rect x="146" y="132" width="12" height="6" fill="#f59e0b" rx="2" /> <!-- Toes -->
        </g>
      </g>
    </svg>
  </div>
  `;
}

// Exercise Database mapped to Movable Stickers
const exerciseDatabase = {
  underweight: {
    title: "Hypertrophy & Mass-Building Compound Protocol",
    desc: "Multi-joint compound movements to trigger myofibrillar hypertrophy. Movable sticker demonstrations illustrate proper tempo and full range of motion.",
    exercises: [
      {
        name: "Standing Dumbbell Bicep Curl",
        reps: "3 - 4 sets x 10 - 12 reps (Tempo 2-1-2)",
        focus: "Biceps Brachii, Forearm Supination, Peak Contraction",
        badge: "Arm Hypertrophy",
        renderSticker: generateDumbbellCurlSticker
      },
      {
        name: "Olympic Barbell Back Squat",
        reps: "4 sets x 8 - 10 reps (Rest: 120s)",
        focus: "Quadriceps, Glutes, Deep Core Bracing",
        badge: "Primary Mass Builder",
        renderSticker: generateSquatSticker
      },
      {
        name: "Flat Barbell Bench Press",
        reps: "4 sets x 8 - 12 reps (Rest: 90s)",
        focus: "Pectoralis Major, Triceps, Anterior Delts",
        badge: "Upper Body Power",
        renderSticker: generateBenchPressSticker
      },
      {
        name: "Romanian Deadlift (RDL)",
        reps: "3 sets x 10 - 12 reps (Rest: 90s)",
        focus: "Hamstring stretch, Gluteus Maximus, Erector Spinae",
        badge: "Posterior Chain",
        renderSticker: generateDeadliftSticker
      }
    ]
  },
  normal: {
    title: "Functional Strength & Athletic Conditioning",
    desc: "Athletic hybrid routine balancing explosive power, unilateral symmetry, and steady-state conditioning.",
    exercises: [
      {
        name: "Dumbbell Power Curl & Press",
        reps: "3 sets x 12 reps (Rest: 60s)",
        focus: "Biceps, Deltoids, Core Anti-rotation",
        badge: "Athletic Strength",
        renderSticker: generateDumbbellCurlSticker
      },
      {
        name: "Olympic Barbell Squat",
        reps: "3 sets x 10 - 12 reps (Rest: 75s)",
        focus: "Leg drive, hip stability, ankle mobility",
        badge: "Functional Power",
        renderSticker: generateSquatSticker
      },
      {
        name: "Flat Bench Press & Push-Ups",
        reps: "3 sets x 12 - 15 reps (Rest: 60s)",
        focus: "Chest definition, scapular retraction",
        badge: "Upper Tone",
        renderSticker: generateBenchPressSticker
      },
      {
        name: "Incline Interval Cardio Walk / Jog",
        reps: "20 - 25 mins (Zone 2 Heart Rate 125-140 bpm)",
        focus: "Cardiovascular VO2 max & metabolic conditioning",
        badge: "Stamina & Heart",
        renderSticker: generateCardioSticker
      }
    ]
  },
  overweight: {
    title: "Joint-Friendly Calorie Burn & Muscle-Retention Routine",
    desc: "Resistance and low-impact movements designed to maximize lipolysis while protecting knees and joints.",
    exercises: [
      {
        name: "Incline Treadmill Walk / Zone 2 Cardio",
        reps: "30 - 40 mins at 10-12% Incline, 3.2 mph",
        focus: "Aerobic fat oxidation with 0% impact on knee joints",
        badge: "Max Lipolysis 🔥",
        renderSticker: generateCardioSticker
      },
      {
        name: "Controlled Barbell / Box Squats",
        reps: "3 sets x 12 - 15 reps (Rest: 60s)",
        focus: "Joint-safe posterior chain activation & calorie burn",
        badge: "Low-Impact Legs",
        renderSticker: generateSquatSticker
      },
      {
        name: "Incline Push-Ups & Floor Presses",
        reps: "3 sets x 12 reps (Rest: 60s)",
        focus: "Chest muscle retention while in calorie deficit",
        badge: "Upper Foundation",
        renderSticker: generatePushUpSticker
      },
      {
        name: "Seated Dumbbell Bicep Curls",
        reps: "3 sets x 12 - 15 reps (Rest: 45s)",
        focus: "Isolated bicep hypertrophy without spinal compression",
        badge: "Isolated Sculpt",
        renderSticker: generateDumbbellCurlSticker
      }
    ]
  }
};

// Supplement Database
const supplementDatabase = {
  underweight: [
    { name: "Creatine Monohydrate (Creapure)", brand: "Optimum Nutrition / MuscleBlaze", benefit: "Boosts cellular ATP for strength and clean mass accumulation", basePrice: 29.99, icon: "⚡", tag: "Strength & Size", query: "creatine monohydrate micronized" },
    { name: "Clean Mass Gainer Protein", brand: "Dymatize Super Mass / MB Gold", benefit: "1250+ clean calories with 50g bioavailable protein per shake", basePrice: 48.00, icon: "🥤", tag: "Caloric Surplus", query: "mass gainer protein powder" },
    { name: "Omega-3 Triple Strength Fish Oil", brand: "Nordic Naturals / TrueBasics", benefit: "Reduces joint inflammation & speeds up protein absorption", basePrice: 22.00, icon: "🐟", tag: "Joint & Heart", query: "triple strength omega 3 fish oil" }
  ],
  normal: [
    { name: "100% Whey Isolate Protein", brand: "Gold Standard ON / Dymatize ISO", benefit: "25g pure fast-absorbing protein with zero sugar", basePrice: 38.00, icon: "🥛", tag: "Lean Recovery", query: "100 percent whey isolate protein" },
    { name: "Creatine Monohydrate (Micronized)", brand: "Nutricost / MB CreAbsorb", benefit: "Sustained athletic performance & cognitive focus", basePrice: 21.00, icon: "⚡", tag: "Athletic Power", query: "micronized creatine powder" },
    { name: "Daily Complete Multivitamin", brand: "Opti-Men / Fast&Up Vitalize", benefit: "Full micronutrient support & energy metabolism", basePrice: 18.00, icon: "💊", tag: "Vital Micro Health", query: "daily multivitamin for athletes" }
  ],
  overweight: [
    { name: "100% Hydrolyzed Whey Isolate", brand: "ISO100 Dymatize / MB Biozyme", benefit: "Near zero carb, prevents muscle catabolism in deficit", basePrice: 42.00, icon: "🥛", tag: "Deficit Retention", query: "hydrolyzed whey isolate zero carb" },
    { name: "EGCG Green Tea Extract + L-Carnitine", brand: "NOW Foods / MuscleBlaze", benefit: "Enhances fat fatty acid transport during cardio workouts", basePrice: 16.50, icon: "🌱", tag: "Metabolic Support", query: "green tea extract egcg carnitine" },
    { name: "Zero-Sugar Electrolytes & Hydration", brand: "Liquid I.V. Zero / Fast&Up Reload", benefit: "Prevents cramping, fatigue and headache during calorie deficit", basePrice: 19.00, icon: "💧", tag: "Sugar Free", query: "zero sugar electrolyte powder" }
  ]
};

// Mascot SVG Generator for Page 1
function getMascotSticker(status) {
  if (status === 'underweight') {
    return `
      <svg viewBox="0 0 120 120" class="w-36 h-36 mascot-bounce die-cut-sticker">
        <!-- Sticker Border -->
        <circle cx="60" cy="60" r="54" fill="#ffffff" />
        <circle cx="60" cy="42" r="16" fill="#38bdf8" />
        <circle cx="55" cy="40" r="2.5" fill="#0f172a" />
        <circle cx="65" cy="40" r="2.5" fill="#0f172a" />
        <path d="M 56,48 Q 60,52 64,48" stroke="#0f172a" stroke-width="2" fill="none" stroke-linecap="round" />
        <path d="M 60,58 L 60,82" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" />
        <!-- Flexing Lean Arms -->
        <path d="M 60,65 L 44,55 L 40,46" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 60,65 L 76,55 L 80,46" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 60,82 L 52,106" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" />
        <path d="M 60,82 L 68,106" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" />
        <text x="60" y="20" text-anchor="middle" font-size="9" font-weight="900" fill="#0284c7">NEEDS FUEL ⚡</text>
      </svg>
    `;
  } else if (status === 'overweight') {
    return `
      <svg viewBox="0 0 120 120" class="w-36 h-36 mascot-bounce die-cut-sticker">
        <circle cx="60" cy="60" r="54" fill="#ffffff" />
        <!-- Motivated Body with Sweatband -->
        <circle cx="60" cy="38" r="16" fill="#f43f5e" />
        <rect x="45" y="27" width="30" height="5" rx="2" fill="#fbbf24" />
        <circle cx="54" cy="38" r="2.5" fill="#0f172a" />
        <circle cx="66" cy="38" r="2.5" fill="#0f172a" />
        <path d="M 56,44 Q 60,47 64,44" stroke="#0f172a" stroke-width="2" fill="none" stroke-linecap="round" />
        <ellipse cx="60" cy="74" rx="24" ry="20" fill="#f43f5e" />
        <path d="M 44,66 L 30,78" stroke="#f43f5e" stroke-width="7" stroke-linecap="round" />
        <path d="M 76,66 L 90,78" stroke="#f43f5e" stroke-width="7" stroke-linecap="round" />
        <path d="M 50,92 L 46,108" stroke="#f43f5e" stroke-width="7" stroke-linecap="round" />
        <path d="M 70,92 L 74,108" stroke="#f43f5e" stroke-width="7" stroke-linecap="round" />
        <text x="60" y="19" text-anchor="middle" font-size="9" font-weight="900" fill="#e11d48">READY TO BURN 🔥</text>
      </svg>
    `;
  } else {
    return `
      <svg viewBox="0 0 120 120" class="w-36 h-36 mascot-bounce die-cut-sticker">
        <circle cx="60" cy="60" r="54" fill="#ffffff" />
        <!-- Athletic Gold Medal Mascot -->
        <polygon points="60,12 63,18 70,18 64,23 66,29 60,25 54,29 56,23 50,18 57,18" fill="#fbbf24" />
        <circle cx="60" cy="40" r="16" fill="#10b981" />
        <circle cx="54" cy="38" r="2.5" fill="#0f172a" />
        <circle cx="66" cy="38" r="2.5" fill="#0f172a" />
        <path d="M 54,46 Q 60,52 66,46" stroke="#0f172a" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path d="M 60,56 L 60,82" stroke="#10b981" stroke-width="11" stroke-linecap="round" />
        <!-- Big Muscular Flex -->
        <path d="M 60,62 L 40,54 L 38,42" stroke="#10b981" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 60,62 L 80,54 L 82,42" stroke="#10b981" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 60,82 L 49,106" stroke="#10b981" stroke-width="6" stroke-linecap="round" />
        <path d="M 60,82 L 71,106" stroke="#10b981" stroke-width="6" stroke-linecap="round" />
        <text x="60" y="116" text-anchor="middle" font-size="8.5" font-weight="900" fill="#059669">PEAK SHAPE ⭐</text>
      </svg>
    `;
  }
}

// Country Selector Function
function changeCountry(code) {
  currentCountry = code;
  const config = countryConfig[code];
  document.getElementById('country-flag').innerText = config.flag;
  
  // Re-render UI with localized currencies & stores
  renderNutritionSection();
  renderWorkoutSection();
  showToast(`Region updated to ${config.name} (${config.currency})`);
}

// Tab Switching
function switchTab(tab) {
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.add('hidden'));
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.classList.add('text-slate-300');
  });

  const targetPage = document.getElementById(`page-${tab}`);
  const targetNav = document.getElementById(`nav-${tab}`);

  if (targetPage) targetPage.classList.remove('hidden');
  if (targetNav) {
    targetNav.classList.add('active');
    targetNav.classList.remove('text-slate-300');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToNutrition() { switchTab('nutrition'); }
function goToWorkout() { switchTab('workout'); }

// Unit Switching
function setUnit(unit) {
  currentUnit = unit;
  const btnMetric = document.getElementById('btn-metric');
  const btnImperial = document.getElementById('btn-imperial');
  const metricContainer = document.getElementById('metric-height-container');
  const imperialContainer = document.getElementById('imperial-height-container');
  const weightUnitTag = document.getElementById('weight-unit-tag');
  const weightUnitLabel = document.getElementById('weight-unit-label');
  const weightInput = document.getElementById('input-weight');

  if (unit === 'metric') {
    btnMetric.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-amber-400 text-slate-950 transition-all';
    btnImperial.className = 'px-3 py-1 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-all';
    metricContainer.classList.remove('hidden');
    imperialContainer.classList.add('hidden');
    weightUnitTag.innerText = 'KG';
    weightUnitLabel.innerText = 'kilograms';
    weightInput.value = Math.round(parseFloat(weightInput.value || 150) * 0.453592) || 68;
  } else {
    btnImperial.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-amber-400 text-slate-950 transition-all';
    btnMetric.className = 'px-3 py-1 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-all';
    metricContainer.classList.add('hidden');
    imperialContainer.classList.remove('hidden');
    weightUnitTag.innerText = 'LBS';
    weightUnitLabel.innerText = 'pounds';
    weightInput.value = Math.round(parseFloat(weightInput.value || 68) * 2.20462) || 150;
  }
  calculateBMI();
}

function updateHeightMetric(val) {
  document.getElementById('metric-height-val').innerText = `${val} cm`;
  calculateBMI();
}

// Core BMI Calculation
function calculateBMI() {
  const age = parseInt(document.getElementById('input-age').value) || 24;
  let heightMeters = 1.75;
  let weightKg = 68;

  if (currentUnit === 'metric') {
    const heightCm = parseFloat(document.getElementById('input-height-cm').value) || 175;
    heightMeters = heightCm / 100;
    weightKg = parseFloat(document.getElementById('input-weight').value) || 68;
  } else {
    const feet = parseFloat(document.getElementById('input-height-ft').value) || 5;
    const inches = parseFloat(document.getElementById('input-height-in').value) || 9;
    const totalInches = (feet * 12) + inches;
    heightMeters = (totalInches * 2.54) / 100;
    const weightLbs = parseFloat(document.getElementById('input-weight').value) || 150;
    weightKg = weightLbs * 0.453592;
  }

  if (heightMeters <= 0 || weightKg <= 0) return;

  const bmi = weightKg / (heightMeters * heightMeters);

  // Age 65+ Clinical Adjustment Buffer
  let minBMI = 18.5;
  let maxBMI = 24.9;
  if (age >= 65) {
    minBMI = 22.0;
    maxBMI = 27.0;
  }

  const minHealthyKg = minBMI * (heightMeters * heightMeters);
  const maxHealthyKg = maxBMI * (heightMeters * heightMeters);
  const minHealthyLbs = minHealthyKg * 2.20462;
  const maxHealthyLbs = maxHealthyKg * 2.20462;

  let status = 'normal';
  if (bmi < minBMI) {
    status = 'underweight';
  } else if (bmi > maxBMI) {
    status = 'overweight';
  }

  currentBMIData = {
    bmi: parseFloat(bmi.toFixed(1)),
    status: status,
    healthyMinKg: minHealthyKg.toFixed(1),
    healthyMaxKg: maxHealthyKg.toFixed(1),
    healthyMinLbs: minHealthyLbs.toFixed(1),
    healthyMaxLbs: maxHealthyLbs.toFixed(1)
  };

  renderCalculatorResults();
  renderNutritionSection();
  renderWorkoutSection();
}

function renderCalculatorResults() {
  const scoreElem = document.getElementById('display-bmi-score');
  const badgeElem = document.getElementById('badge-bmi-status');
  const rangeElem = document.getElementById('display-healthy-range');
  const mascotContainer = document.getElementById('mascot-container');
  const marker = document.getElementById('bmi-marker');

  scoreElem.innerHTML = `${currentBMIData.bmi} <span class="text-sm font-semibold text-slate-400">BMI</span>`;

  if (currentBMIData.status === 'underweight') {
    badgeElem.innerText = 'Underweight (Lean)';
    badgeElem.className = 'inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 bg-sky-500/20 border border-sky-400/40 text-sky-300';
  } else if (currentBMIData.status === 'overweight') {
    badgeElem.innerText = currentBMIData.bmi >= 30 ? 'High BMI (Obese Range)' : 'Overweight Range';
    badgeElem.className = 'inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 bg-rose-500/20 border border-rose-400/40 text-rose-300';
  } else {
    badgeElem.innerText = 'Optimal Healthy Weight';
    badgeElem.className = 'inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300';
  }

  if (currentUnit === 'metric') {
    rangeElem.innerHTML = `Healthy target: <strong class="text-amber-300">${currentBMIData.healthyMinKg} kg - ${currentBMIData.healthyMaxKg} kg</strong>`;
  } else {
    rangeElem.innerHTML = `Healthy target: <strong class="text-amber-300">${currentBMIData.healthyMinLbs} lbs - ${currentBMIData.healthyMaxLbs} lbs</strong>`;
  }

  mascotContainer.innerHTML = getMascotSticker(currentBMIData.status);

  // Position BMI Marker between 15 and 35
  const clampedBMI = Math.max(15, Math.min(35, currentBMIData.bmi));
  const percent = ((clampedBMI - 15) / (35 - 15)) * 100;
  marker.style.left = `${percent}%`;
}

// Render Nutrition Tab with Country Currency
function renderNutritionSection() {
  const dataset = nutritionDatabase[currentBMIData.status];
  document.getElementById('nutrition-title').innerText = dataset.title;
  document.getElementById('nutrition-tag').innerText = dataset.tag;
  document.getElementById('nutrition-desc').innerText = dataset.desc;

  const grid = document.getElementById('food-cards-grid');
  grid.innerHTML = dataset.foods.map(item => {
    const formattedPrice = formatPrice(item.basePrice);
    return `
      <div onclick="openAffiliateModal('${escapeQuotes(item.name)}', '${item.icon}', '${escapeQuotes(item.benefit)}', '${formattedPrice}', '${escapeQuotes(item.query)}')"
           class="pop-btn glass-card p-4 rounded-2xl cursor-pointer hover:border-amber-400/50 transition group flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-3xl">${item.icon}</span>
            <span class="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded font-black uppercase">Where to Buy</span>
          </div>
          <h4 class="text-base font-bold text-white group-hover:text-amber-300 transition">${item.name}</h4>
          <p class="text-xs text-slate-300 mt-1">${item.benefit}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <span class="font-mono text-amber-400 font-bold">${formattedPrice}</span>
          <span class="text-slate-300 group-hover:text-white font-semibold flex items-center gap-1">Check Stores <i class="fa-solid fa-arrow-right text-[10px]"></i></span>
        </div>
      </div>
    `;
  }).join('');
}

// Render Gym Section with Movable Stickers
function renderWorkoutSection() {
  const workoutData = exerciseDatabase[currentBMIData.status];
  document.getElementById('workout-title').innerText = workoutData.title;
  document.getElementById('workout-desc').innerText = workoutData.desc;

  const exerciseGrid = document.getElementById('exercise-cards-grid');
  exerciseGrid.innerHTML = workoutData.exercises.map(ex => `
    <div class="exercise-card p-5 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">${ex.badge}</span>
          <span class="text-xs font-mono text-amber-400 font-bold">${ex.reps}</span>
        </div>
        <h4 class="text-base font-extrabold text-white mb-2">${ex.name}</h4>
        
        <!-- Movable Die-Cut Graphic Sticker Graphic -->
        <div class="my-3">
          ${ex.renderSticker()}
        </div>
        
        <p class="text-xs text-slate-300"><strong class="text-slate-100">Biomechanics Target:</strong> ${ex.focus}</p>
      </div>
    </div>
  `).join('');

  // Supplements
  const supplements = supplementDatabase[currentBMIData.status];
  const supplementGrid = document.getElementById('supplement-cards-grid');
  supplementGrid.innerHTML = supplements.map(sup => {
    const formattedPrice = formatPrice(sup.basePrice);
    const conf = countryConfig[currentCountry];
    const buyLink = `https://www.amazon.com/s?k=${encodeURIComponent(sup.query)}&tag=${conf.amazonTag}`;
    return `
      <div class="glass-card p-4 rounded-2xl flex flex-col justify-between border border-white/10 hover:border-emerald-400/50 transition group">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl">${sup.icon}</span>
            <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">${sup.tag}</span>
          </div>
          <h4 class="text-sm font-black text-white group-hover:text-emerald-300 transition">${sup.name}</h4>
          <p class="text-[11px] text-slate-400">${sup.brand}</p>
          <p class="text-xs text-slate-300 mt-2">${sup.benefit}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <span class="font-mono text-xs font-bold text-amber-400">${formattedPrice}</span>
          <a href="${buyLink}" target="_blank" rel="noopener noreferrer" class="pop-btn text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-1.5 rounded-lg flex items-center gap-1">
            Buy (${conf.name}) <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// Affiliate Where To Buy Modal
function openAffiliateModal(name, icon, benefit, price, query) {
  document.getElementById('modal-item-title').innerText = name;
  document.getElementById('modal-item-icon').innerText = icon;
  document.getElementById('modal-item-subtitle').innerText = `Certified partner stores for ${name}`;
  document.getElementById('modal-item-benefit').innerText = benefit;
  document.getElementById('modal-item-price').innerText = price;
  
  const conf = countryConfig[currentCountry];
  document.getElementById('modal-country-name').innerText = `${conf.name} ${conf.flag}`;

  const container = document.getElementById('retailer-links-container');
  container.innerHTML = conf.retailers.map(ret => `
    <a href="${ret.getUrl(query)}" target="_blank" rel="noopener noreferrer" class="pop-btn flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-amber-500/20 hover:to-slate-800 border border-white/10 group transition">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-white/5 ${ret.color} flex items-center justify-center font-black">
          <i class="${ret.icon} text-lg"></i>
        </div>
        <div>
          <div class="text-xs font-bold text-white group-hover:text-amber-300 flex items-center gap-1.5">
            ${ret.name}
          </div>
          <div class="text-[10.5px] text-slate-400">${ret.desc}</div>
        </div>
      </div>
      <span class="text-xs font-bold text-amber-400 flex items-center gap-1">Buy <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i></span>
    </a>
  `).join('');

  document.getElementById('affiliate-modal').classList.remove('hidden');
}

function closeAffiliateModal() {
  document.getElementById('affiliate-modal').classList.add('hidden');
}

// Copy Coupon
function copyCoupon() {
  navigator.clipboard.writeText('NUTRIFIT15').then(() => {
    showToast('Promo Code "NUTRIFIT15" copied! 15% discount applied.');
  }).catch(() => {
    showToast('Code: NUTRIFIT15');
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').innerText = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2800);
}

function escapeQuotes(str) {
  return str.replace(/'/g, "\\'");
}

document.addEventListener('DOMContentLoaded', () => {
  calculateBMI();
});