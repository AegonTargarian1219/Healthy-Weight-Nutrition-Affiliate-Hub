// State Management
let currentUnit = 'metric';
let currentBMIData = {
  bmi: 22.2,
  status: 'normal',
  healthyMinKg: 56.7,
  healthyMaxKg: 76.3,
  healthyMinLbs: 125.0,
  healthyMaxLbs: 168.2
};

// Database: Targeted Nutrition Plans
const nutritionDatabase = {
  underweight: {
    title: "Clean Caloric Surplus (+350 to 500 kcal)",
    tag: "Lean Mass Building",
    desc: "Focus on nutrient-dense complex carbs, essential fats, and protein-packed whole foods to fuel muscle growth safely.",
    foods: [
      { name: "Avocado", icon: "🥑", benefit: "Monounsaturated fats & calorie density", price: "$1.89 each", query: "fresh organic avocados" },
      { name: "Rolled Oats", icon: "🥣", benefit: "Slow-release carbs and soluble beta-glucan", price: "$4.29 / 2lb", query: "organic rolled oats" },
      { name: "Peanut / Almond Butter", icon: "🥜", benefit: "Caloric density & plant-based proteins", price: "$5.99 / jar", query: "natural almond butter no sugar" },
      { name: "Wild Alaskan Salmon", icon: "🐟", benefit: "High protein & Omega-3 recovery fats", price: "$12.99 / lb", query: "wild caught salmon fillets" },
      { name: "Sweet Potatoes", icon: "🍠", benefit: "Glycogen replenishment & potassium", price: "$1.49 / lb", query: "organic sweet potatoes" },
      { name: "Greek Yogurt (Full Fat)", icon: "🥛", benefit: "Casein protein & gut-healthy probiotics", price: "$4.99 / tub", query: "plain greek yogurt full fat" }
    ]
  },
  normal: {
    title: "Metabolic Maintenance & Micronutrient Balance",
    tag: "Athletic Longevity",
    desc: "Maintain your optimal body mass with antioxidant-rich plants, lean bioavailable proteins, and anti-inflammatory greens.",
    foods: [
      { name: "Organic Honeycrisp Apples", icon: "🍎", benefit: "Digestive pectin & antioxidant quercetin", price: "$2.99 / lb", query: "organic honeycrisp apples" },
      { name: "Fresh Broccoli", icon: "🥦", benefit: "Sulforaphane, Vitamin C & cruciferous fiber", price: "$1.99 / bunch", query: "organic broccoli florets" },
      { name: "Baby Spinach", icon: "🥗", benefit: "Iron, nitrates for endurance & Vitamin K", price: "$3.49 / box", query: "organic baby spinach fresh" },
      { name: "Free-Range Eggs", icon: "🥚", benefit: "Complete amino acid profile & choline", price: "$4.49 / dozen", query: "pasture raised organic eggs" },
      { name: "Raw Walnuts & Almonds", icon: "🌰", benefit: "Brain-boosting DHA precursors & zinc", price: "$7.99 / bag", query: "raw organic walnuts and almonds" },
      { name: "Wild Blueberries", icon: "🫐", benefit: "Highest antioxidant score & recovery boost", price: "$4.99 / pack", query: "fresh organic blueberries" }
    ]
  },
  overweight: {
    title: "High-Volume, Fiber-Dense Caloric Deficit (-300 to 500 kcal)",
    tag: "Fat Loss & Satiety",
    desc: "Maximize meal volume and fullness without calorie spikes through high-fiber cruciferous vegetables and ultra-lean proteins.",
    foods: [
      { name: "Broccoli & Cauliflower", icon: "🥦", benefit: "High volume, rich fiber & hunger suppression", price: "$2.19 / head", query: "organic broccoli and cauliflower" },
      { name: "Crisp Cucumbers", icon: "🥒", benefit: "96% hydration, near-zero calories & electrolytes", price: "$0.99 each", query: "english seedless cucumbers" },
      { name: "Organic Crisp Apples", icon: "🍏", benefit: "Low GI fruit with high satiety index", price: "$2.89 / lb", query: "organic green apples granny smith" },
      { name: "Lean Chicken Breast / Tofu", icon: "🍗", benefit: "High thermic effect of food (TEF) & pure protein", price: "$5.99 / lb", query: "organic skinless chicken breast" },
      { name: "Matcha & Green Tea", icon: "🍵", benefit: "EGCG polyphenols to elevate basal metabolic rate", price: "$8.99 / tin", query: "organic ceremonial matcha green tea" },
      { name: "Chia Seeds", icon: "🌱", benefit: "Absorbs 10x water for sustained fullness", price: "$6.49 / bag", query: "organic black chia seeds" }
    ]
  }
};

// Database: Targeted Exercises & Postures
const exerciseDatabase = {
  underweight: {
    title: "Hypertrophy & Mass-Building Compound Protocol",
    desc: "Prioritize multi-joint barbell and dumbbell movements with adequate rest to stimulate myofibrillar muscle growth.",
    exercises: [
      {
        name: "Barbell Back Squat",
        reps: "3 - 4 sets x 8 - 10 reps (Rest: 120s)",
        focus: "Quadriceps, Glutes, Core Bracing",
        badge: "Compound Builder",
        svg: `<svg viewBox="0 0 200 130" class="w-full h-28 mx-auto stroke-amber-400 fill-none stroke-2 stroke-linecap-round stroke-linejoin-round"><path d="M40 30 L160 30" stroke-width="4" stroke="#f59e0b" /><circle cx="40" cy="30" r="8" fill="#f59e0b" /><circle cx="160" cy="30" r="8" fill="#f59e0b" /><circle cx="100" cy="22" r="7" /><path d="M100 30 L95 65 L70 95 L65 125" /><path d="M95 65 L115 95 L125 125" /><path d="M85 30 L95 50" /><path d="M115 30 L105 50" /></svg>`
      },
      {
        name: "Flat Dumbbell / Barbell Bench Press",
        reps: "3 - 4 sets x 8 - 12 reps (Rest: 90s)",
        focus: "Pectoralis Major, Anterior Deltoids, Triceps",
        badge: "Upper Body Mass",
        svg: `<svg viewBox="0 0 200 130" class="w-full h-28 mx-auto stroke-amber-400 fill-none stroke-2 stroke-linecap-round stroke-linejoin-round"><path d="M40 90 L160 90" stroke-width="4" stroke="#64748b" /><circle cx="70" cy="80" r="6" /><path d="M76 80 L130 80 L135 110" /><path d="M95 80 L95 45" /><path d="M60 45 L130 45" stroke-width="4" stroke="#f59e0b" /><circle cx="60" cy="45" r="7" fill="#f59e0b" /><circle cx="130" cy="45" r="7" fill="#f59e0b" /></svg>`
      },
      {
        name: "Romanian Deadlift (RDL)",
        reps: "3 sets x 10 - 12 reps (Rest: 90s)",
        focus: "Hamstring stretch, Glute max, Spinal erectors",
        badge: "Posterior Chain",
        svg: `<svg viewBox="0 0 200 130" class="w-full h-28 mx-auto stroke-amber-400 fill-none stroke-2 stroke-linecap-round stroke-linejoin-round"><circle cx="130" cy="30" r="7" /><path d="M130 37 L100 65 L95 125" /><path d="M100 65 L105 125" /><path d="M115 50 L80 90" /><circle cx="80" cy="90" r="7" fill="#f59e0b" /><path d="M60 90 L100 90" stroke-width="3" stroke="#f59e0b" /></svg>`
      },
      {
        name: "Seated Cable Row",
        reps: "3 sets x 10 - 12 reps (Rest: 60s)",
        focus: "Latissimus Dorsi, Rhomboids, Mid-Back Width",
        badge: "Back Thickness",
        svg: `<svg viewBox="0 0 200 130" class="w-full h-28 mx-auto stroke-amber-400 fill-none stroke-2 stroke-linecap-round stroke-linejoin-round"><circle cx="80" cy="45" r="7" /><path d="M80 52 L80 95 L130 95" /><path d="M80 70 L120 70" stroke-dasharray="3 3" /><circle cx="150" cy="70" r="5" stroke="#f59e0b" /><path d="M120 70 L150 70" stroke-width="2" stroke="#f59e0b" /><path d="M80 70 L95 70" /></svg>`
      }
    ]
  },
  normal: {
    title: "Functional Strength & Athletic Conditioning",
    desc: "A balanced hybrid routine combining unilateral dumbbell work, explosive core stability, and compound lifts.",
    exercises: [
      {
        name: "Goblet Squat & Lunges",
        reps: "3 sets x 12 - 15 reps (Rest: 60s)",
        focus: "Leg drive, hip mobility, knee stabilization",
        badge: "Mobility & Strength",
        svg: `<svg viewBox="0 0 200 130" class="w-full h-28 mx-auto stroke-emerald-400 fill-none stroke-2 stroke-linecap-round"><circle cx="100" cy="25" r="7" /><path d="M100 32 L100 70 L80 115" /><path d="M100 70 L120 115" /><circle cx="100" cy="50" r="8" fill="#10b981" /><path d="M90 45 L100 50 L110 45" /></svg>`
      },
      {
        name: "Push-Up to Renegade Row",
        reps: "3 sets x 10 reps each arm (Rest: 60s)",
        focus: "Chest, Triceps, Anti-rotational Core",
        badge: "Athletic Core",
        svg: `<svg viewBox="0 0 200 130" class="w-full h-28 mx-auto stroke-emerald-400 fill-none stroke-2 stroke-linecap-round"><circle cx="50" cy="50" r="6" /><path d="M55 52 L140 75 L160 115" /><path d="M75 57 L85 95" /><path d="M95 62 L105 80" /><circle cx="85" cy="100" r="6" fill="#10b981" /></svg>`
      },
      {
        name: "Incline Dumbbell Press",
        reps: "3 sets x 10 - 12 reps (Rest: 75s)",
        focus: "Clavicular Pectoralis, Shoulder Health",
        badge: "Upper Chest",
        svg: `<svg viewBox="0 0 200 130" class="w-full h-28 mx-auto stroke-emerald-400 fill-none stroke-2 stroke-linecap-round"><path d="M60 110 L140 50" stroke-width="3" stroke="#64748b" /><circle cx="95" cy="50" r="6" /><path d="M95 56 L125 75" /><path d="M110 65 L100 30" /><circle cx="100" cy="30" r="6" fill="#10b981" /></svg>`
      },
      {
        name: "Kettlebell Swing",
        reps: "4 sets x 15 reps (Rest: 45s)",
        focus: "Glute power, posterior explosive chain, VO2 Max",
        badge: "Metabolic Power",
        svg: `<svg viewBox="0 0 200 130" class="w-full h-28 mx-auto stroke-emerald-400 fill-none stroke-2 stroke-linecap-round"><circle cx="120" cy="35" r="7" /><path d="M120 42 L110 75 L115 120" /><path d="M110 75 L95 120" /><path d="M110 55 L70 55" stroke-width="2" /><circle cx="65" cy="55" r="8" fill="#10b981" /></svg>`
      }
    ]
  },
  overweight: {
    title: "Low-Impact Calorie Burn & Muscle-Preservation Routine",
    desc: "Joint-friendly resistance movements designed to burn high calories and protect knee and ankle joints while holding onto lean muscle.",
    exercises: [
      {
        name: "Box Squats / Supported Squats",
        reps: "3 - 4 sets x 12 - 15 reps (Rest: 60s)",
        focus: "Safe knee tracking, glutes, quadriceps",
        badge: "Joint-Safe Builder",
        svg: `<svg viewBox="0 0 200 130" class="w-full h-28 mx-auto stroke-rose-400 fill-none stroke-2 stroke-linecap-round"><rect x="50" y="75" width="35" height="40" stroke="#f43f5e" /><circle cx="95" cy="30" r="7" /><path d="M95 37 L90 75 L70 75 L70 120" /><path d="M90 75 L110 120" /></svg>`
      },
      {
        name: "Incline Push-Ups / Machine Chest Press",
        reps: "3 sets x 12 reps (Rest: 60s)",
        focus: "Upper body strength without wrist/shoulder torque",
        badge: "Upper Foundation",
        svg: `<svg viewBox="0 0 200 130" class="w-full h-28 mx-auto stroke-rose-400 fill-none stroke-2 stroke-linecap-round"><path d="M130 50 L130 115" stroke-width="4" stroke="#64748b" /><circle cx="65" cy="40" r="6" /><path d="M70 45 L115 90" /><path d="M90 65 L130 65" stroke-width="2" stroke="#f43f5e" /></svg>`
      },
      {
        name: "Lat Pulldown (Neutral Grip)",
        reps: "3 sets x 12 - 15 reps (Rest: 60s)",
        focus: "Spinal decompression, upper back posture",
        badge: "Postural Health",
        svg: `<svg viewBox="0 0 200 130" class="w-full h-28 mx-auto stroke-rose-400 fill-none stroke-2 stroke-linecap-round"><path d="M60 20 L140 20" stroke-width="3" stroke="#f43f5e" /><circle cx="100" cy="55" r="7" /><path d="M100 62 L100 100 L115 125" /><path d="M100 70 L75 25" /><path d="M100 70 L125 25" /></svg>`
      },
      {
        name: "Incline Treadmill Walk / Zone 2 Cardio",
        reps: "25 - 35 mins at 10-12% Incline, 3.2 mph",
        focus: "Aerobic lipolysis, heart rate 120-140 bpm",
        badge: "Max Calorie Burn",
        svg: `<svg viewBox="0 0 200 130" class="w-full h-28 mx-auto stroke-rose-400 fill-none stroke-2 stroke-linecap-round"><path d="M40 110 L160 85" stroke-width="4" stroke="#f43f5e" /><circle cx="100" cy="40" r="7" /><path d="M100 47 L95 80 L80 105" /><path d="M95 80 L115 95" /><path d="M100 60 L125 60" /></svg>`
      }
    ]
  }
};

// Database: Supplement Recommendations with Affiliate Products
const supplementDatabase = {
  underweight: [
    { name: "Creatine Monohydrate (Creapure)", brand: "Optimum Nutrition", benefit: "Boosts cellular ATP for strength & mass accumulation", price: "$29.99", icon: "⚡", tag: "Essential Muscle", query: "creatine monohydrate optimum nutrition" },
    { name: "Clean Mass Gainer Protein", brand: "Dymatize Super Mass", benefit: "1280 clean calories & 52g protein per shake", price: "$49.99", icon: "🥤", tag: "Caloric Surplus", query: "dymatize super mass gainer protein" },
    { name: "Omega-3 Triple Strength Fish Oil", brand: "Nordic Naturals", benefit: "Reduces muscle inflammation & enhances nutrient uptake", price: "$24.99", icon: "🐟", tag: "Joint & Heart", query: "nordic naturals ultimate omega" }
  ],
  normal: [
    { name: "100% Whey Isolate Protein", brand: "Gold Standard ON", benefit: "25g pure fast-digesting protein with zero fillers", price: "$39.99", icon: "🥛", tag: "Lean Recovery", query: "gold standard 100 whey protein powder" },
    { name: "Creatine Monohydrate (Micronized)", brand: "Nutricost", benefit: "Enhanced cognitive focus and gym strength", price: "$22.99", icon: "⚡", tag: "Strength & Power", query: "nutricost creatine monohydrate micronized" },
    { name: "Daily Men's/Women's Multivitamin", brand: "Opti-Men / Opti-Women", benefit: "Complete micronutrient coverage for active athletes", price: "$19.99", icon: "💊", tag: "Micro Health", query: "optimum nutrition opti-men multivitamin" }
  ],
  overweight: [
    { name: "100% Whey Hydrolyzed / Isolate", brand: "ISO100 Dymatize", benefit: "Zero sugar, <1g carb, preserves lean muscle while in deficit", price: "$36.99", icon: "🥛", tag: "Deficit Retention", query: "dymatize iso100 whey protein isolate" },
    { name: "EGCG Green Tea Extract + Carnitine", brand: "NOW Supplements", benefit: "Accelerates fatty acid oxidation during Zone 2 cardio", price: "$16.99", icon: "🌱", tag: "Metabolic Support", query: "now supplements green tea extract egcg" },
    { name: "Electrolytes & Hydration Powder", brand: "Liquid I.V. Sugar Free", benefit: "Maintains optimal hydration and prevents keto/deficit fatigue", price: "$24.99", icon: "💧", tag: "Zero Sugar", query: "liquid iv sugar free hydration multiplier" }
  ]
};

// Mascot SVGs
function getMascotSVG(status) {
  if (status === 'underweight') {
    return `
      <svg viewBox="0 0 120 120" class="w-32 h-32 mascot-bounce">
        <circle cx="60" cy="40" r="18" fill="#38bdf8" />
        <circle cx="54" cy="38" r="2.5" fill="#0f172a" />
        <circle cx="66" cy="38" r="2.5" fill="#0f172a" />
        <path d="M56 46 Q60 50 64 46" stroke="#0f172a" stroke-width="2" fill="none" stroke-linecap="round" />
        <path d="M60 58 L60 85" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" />
        <path d="M60 66 L42 55 L38 45" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M60 66 L78 55 L82 45" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M60 85 L50 112" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" />
        <path d="M60 85 L70 112" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" />
        <text x="60" y="15" text-anchor="middle" font-size="11" font-weight="bold" fill="#38bdf8">Needs Fuel ⚡</text>
      </svg>
    `;
  } else if (status === 'overweight') {
    return `
      <svg viewBox="0 0 120 120" class="w-32 h-32 mascot-bounce">
        <circle cx="60" cy="36" r="18" fill="#f43f5e" />
        <rect x="42" y="22" width="36" height="6" rx="3" fill="#fbbf24" />
        <circle cx="53" cy="36" r="2.5" fill="#0f172a" />
        <circle cx="67" cy="36" r="2.5" fill="#0f172a" />
        <path d="M56 43 Q60 46 64 43" stroke="#0f172a" stroke-width="2" fill="none" stroke-linecap="round" />
        <ellipse cx="60" cy="74" rx="26" ry="24" fill="#f43f5e" />
        <path d="M42 64 L26 78" stroke="#f43f5e" stroke-width="7" stroke-linecap="round" />
        <path d="M78 64 L94 78" stroke="#f43f5e" stroke-width="7" stroke-linecap="round" />
        <path d="M48 95 L44 114" stroke="#f43f5e" stroke-width="8" stroke-linecap="round" />
        <path d="M72 95 L76 114" stroke="#f43f5e" stroke-width="8" stroke-linecap="round" />
        <text x="60" y="14" text-anchor="middle" font-size="11" font-weight="bold" fill="#fbbf24">Ready to Burn 🔥</text>
      </svg>
    `;
  } else {
    return `
      <svg viewBox="0 0 120 120" class="w-32 h-32 mascot-bounce">
        <circle cx="60" cy="38" r="18" fill="#10b981" />
        <circle cx="53" cy="36" r="2.5" fill="#0f172a" />
        <circle cx="67" cy="36" r="2.5" fill="#0f172a" />
        <path d="M54 44 Q60 50 66 44" stroke="#0f172a" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path d="M60 56 L60 84" stroke="#10b981" stroke-width="12" stroke-linecap="round" />
        <path d="M60 62 L38 52 L36 40" stroke="#10b981" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M60 62 L82 52 L84 40" stroke="#10b981" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M60 84 L48 112" stroke="#10b981" stroke-width="7" stroke-linecap="round" />
        <path d="M60 84 L72 112" stroke="#10b981" stroke-width="7" stroke-linecap="round" />
        <polygon points="60,10 63,17 70,17 64,22 66,29 60,25 54,29 56,22 50,17 57,17" fill="#fbbf24" />
      </svg>
    `;
  }
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

function goToNutrition() {
  switchTab('nutrition');
}

function goToWorkout() {
  switchTab('workout');
}

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

// Core Calculation Function
function calculateBMI() {
  const age = parseInt(document.getElementById('input-age').value) || 25;
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

  // Age 65+ Clinical Adjustment
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

// Render Results on UI
function renderCalculatorResults() {
  const scoreElem = document.getElementById('display-bmi-score');
  const badgeElem = document.getElementById('badge-bmi-status');
  const rangeElem = document.getElementById('display-healthy-range');
  const mascotContainer = document.getElementById('mascot-container');
  const marker = document.getElementById('bmi-marker');

  scoreElem.innerHTML = `${currentBMIData.bmi} <span class="text-sm font-semibold text-slate-400">BMI</span>`;

  if (currentBMIData.status === 'underweight') {
    badgeElem.innerText = 'Underweight';
    badgeElem.className = 'inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 bg-sky-500/20 border border-sky-400/40 text-sky-300';
  } else if (currentBMIData.status === 'overweight') {
    badgeElem.innerText = currentBMIData.bmi >= 30 ? 'High BMI / Obese' : 'Overweight Range';
    badgeElem.className = 'inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 bg-rose-500/20 border border-rose-400/40 text-rose-300';
  } else {
    badgeElem.innerText = 'Healthy Optimal Weight';
    badgeElem.className = 'inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300';
  }

  if (currentUnit === 'metric') {
    rangeElem.innerHTML = `Healthy target: <strong class="text-amber-300">${currentBMIData.healthyMinKg} kg - ${currentBMIData.healthyMaxKg} kg</strong>`;
  } else {
    rangeElem.innerHTML = `Healthy target: <strong class="text-amber-300">${currentBMIData.healthyMinLbs} lbs - ${currentBMIData.healthyMaxLbs} lbs</strong>`;
  }

  mascotContainer.innerHTML = getMascotSVG(currentBMIData.status);

  // Position BMI Marker between 15 and 35
  const clampedBMI = Math.max(15, Math.min(35, currentBMIData.bmi));
  const percent = ((clampedBMI - 15) / (35 - 15)) * 100;
  marker.style.left = `${percent}%`;
}

// Render Nutrition Tab
function renderNutritionSection() {
  const dataset = nutritionDatabase[currentBMIData.status];
  document.getElementById('nutrition-title').innerText = dataset.title;
  document.getElementById('nutrition-tag').innerText = dataset.tag;
  document.getElementById('nutrition-desc').innerText = dataset.desc;

  const grid = document.getElementById('food-cards-grid');
  grid.innerHTML = dataset.foods.map(item => `
    <div onclick="openAffiliateModal('${escapeQuotes(item.name)}', '${item.icon}', '${escapeQuotes(item.benefit)}', '${escapeQuotes(item.price)}', '${escapeQuotes(item.query)}')"
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
        <span class="font-mono text-amber-400 font-bold">${item.price}</span>
        <span class="text-slate-300 group-hover:text-white font-semibold flex items-center gap-1">Check Stores <i class="fa-solid fa-arrow-right text-[10px]"></i></span>
      </div>
    </div>
  `).join('');
}

// Render Workout Tab
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
          <span class="text-xs font-mono text-amber-400 font-semibold">${ex.reps}</span>
        </div>
        <h4 class="text-base font-extrabold text-white mb-2">${ex.name}</h4>
        <div class="bg-slate-950/60 rounded-xl p-2 my-3 border border-white/5">
          ${ex.svg}
        </div>
        <p class="text-xs text-slate-300"><strong class="text-slate-200">Target:</strong> ${ex.focus}</p>
      </div>
    </div>
  `).join('');

  const supplements = supplementDatabase[currentBMIData.status];
  const supplementGrid = document.getElementById('supplement-cards-grid');
  supplementGrid.innerHTML = supplements.map(sup => `
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
        <span class="font-mono text-xs font-bold text-amber-400">${sup.price}</span>
        <a href="https://www.amazon.com/s?k=${encodeURIComponent(sup.query)}&tag=fitpulse-20" target="_blank" rel="noopener noreferrer" class="pop-btn text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-1.5 rounded-lg flex items-center gap-1">
          Buy on Amazon <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
        </a>
      </div>
    </div>
  `).join('');
}

// Affiliate Modal Controls
function openAffiliateModal(name, icon, benefit, price, query) {
  document.getElementById('modal-item-title').innerText = name;
  document.getElementById('modal-item-icon').innerText = icon;
  document.getElementById('modal-item-subtitle').innerText = `Affiliate partner selection for ${name}`;
  document.getElementById('modal-item-benefit').innerText = benefit;
  document.getElementById('modal-item-price').innerText = price;

  const encodedQuery = encodeURIComponent(query);
  document.getElementById('btn-amazon-link').href = `https://www.amazon.com/s?k=${encodedQuery}&tag=fitpulse-20`;
  document.getElementById('btn-instacart-link').href = `https://www.instacart.com/store/s?k=${encodedQuery}`;
  document.getElementById('btn-special-link').href = `https://www.iherb.com/search?kw=${encodedQuery}`;

  const modal = document.getElementById('affiliate-modal');
  modal.classList.remove('hidden');
}

function closeAffiliateModal() {
  document.getElementById('affiliate-modal').classList.add('hidden');
}

// Copy Coupon Code Toast
function copyCoupon() {
  navigator.clipboard.writeText('FITBUY15').then(() => {
    showToast('Promo Code "FITBUY15" copied to clipboard!');
  }).catch(() => {
    showToast('Use promo code FITBUY15 at checkout!');
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').innerText = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}

function escapeQuotes(str) {
  return str.replace(/'/g, "\\'");
}

// Initialization on load
document.addEventListener('DOMContentLoaded', () => {
  calculateBMI();
});