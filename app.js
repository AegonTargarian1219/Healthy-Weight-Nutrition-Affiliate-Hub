// Application State
let activeUnit = 'metric';

const FOOD_DATABASE = {
  apple: { name: 'Apples & Berries', icon: '🍎', desc: 'Antioxidant-dense, rich in pectin fiber to balance gut microbiome.' },
  banana: { name: 'Bananas & Oats', icon: '🍌', desc: 'Sustained complex carbohydrates and potassium for clean energy.' },
  avocado: { name: 'Avocado', icon: '🥑', desc: 'Healthy monounsaturated lipids supporting cardiovascular function.' },
  broccoli: { name: 'Broccoli & Greens', icon: '🥦', desc: 'Micronutrient powerhouses offering dietary fiber with low glycemic load.' },
  almonds: { name: 'Almonds & Walnuts', icon: '🥜', desc: 'Dense calorie source packed with omega fatty acids and plant protein.' },
  lentils: { name: 'Lentils & Chickpeas', icon: '🫘', desc: 'High-quality vegetarian protein and complex carbs for muscle repair.' },
  cottage: { name: 'Paneer / Greek Yogurt', icon: '🧀', desc: 'Slow-digesting casein protein supporting sustained satiety and recovery.' }
};

// DOM References
const metricBtn = document.getElementById('metric-btn');
const imperialBtn = document.getElementById('imperial-btn');
const metricHeight = document.getElementById('metric-height-container');
const imperialHeight = document.getElementById('imperial-height-container');
const weightLabel = document.getElementById('weight-unit-label');
const weightInput = document.getElementById('current-weight');
const calcBtn = document.getElementById('calc-btn');
const needle = document.getElementById('bmi-needle');
const foodBadgesContainer = document.getElementById('food-badges');
const buyModal = document.getElementById('buy-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

// Toggle Units
function setUnit(unit) {
  activeUnit = unit;
  if (unit === 'metric') {
    metricBtn.className = "flex-1 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white transition-all";
    imperialBtn.className = "flex-1 py-2 rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all";
    metricHeight.classList.remove('hidden');
    imperialHeight.classList.add('hidden');
    weightLabel.innerText = 'kg';
    weightInput.value = "70";
  } else {
    imperialBtn.className = "flex-1 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white transition-all";
    metricBtn.className = "flex-1 py-2 rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all";
    metricHeight.classList.add('hidden');
    imperialHeight.classList.remove('hidden');
    imperialHeight.classList.add('grid');
    weightLabel.innerText = 'lbs';
    weightInput.value = "154";
  }
  calculateBMI();
}

// Calculate Body Mass and Target
function calculateBMI() {
  const age = parseInt(document.getElementById('age-input').value, 10) || 25;
  let heightCm = 0;
  let weightKg = 0;

  if (activeUnit === 'metric') {
    heightCm = parseFloat(document.getElementById('height-cm').value) || 170;
    weightKg = parseFloat(document.getElementById('current-weight').value) || 65;
  } else {
    const ft = parseFloat(document.getElementById('height-ft').value) || 5;
    const inch = parseFloat(document.getElementById('height-in').value) || 7;
    heightCm = (ft * 30.48) + (inch * 2.54);
    const weightLbs = parseFloat(document.getElementById('current-weight').value) || 145;
    weightKg = weightLbs * 0.453592;
  }

  if (heightCm <= 0 || weightKg <= 0) return;

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  // Age-based adjustments for senior adults (65+)
  let minBmi = 18.5;
  let maxBmi = 24.9;
  if (age >= 65) {
    minBmi = 22.0;
    maxBmi = 27.0;
    document.getElementById('age-range-tag').innerText = "Senior Reference Standard (65+)";
  } else {
    document.getElementById('age-range-tag').innerText = "Adult Reference Standard (18-64)";
  }

  const minHealthyKg = minBmi * (heightM * heightM);
  const maxHealthyKg = maxBmi * (heightM * heightM);

  // Update readouts
  document.getElementById('bmi-val').innerText = bmi.toFixed(1);
  document.getElementById('marker-pos-label').innerText = `Current: ${bmi.toFixed(1)}`;

  if (activeUnit === 'metric') {
    document.getElementById('healthy-range-text').innerText = `${minHealthyKg.toFixed(1)} kg - ${maxHealthyKg.toFixed(1)} kg`;
  } else {
    const minLbs = minHealthyKg * 2.20462;
    const maxLbs = maxHealthyKg * 2.20462;
    document.getElementById('healthy-range-text').innerText = `${minLbs.toFixed(1)} lbs - ${maxLbs.toFixed(1)} lbs`;
  }

  // Update Status and Mascot
  updateStatusAndDiet(bmi);

  // Scale Needle: 16 (0%) to 40 (100%)
  const minScale = 16.0;
  const maxScale = 40.0;
  let percentage = ((bmi - minScale) / (maxScale - minScale)) * 100;
  percentage = Math.max(2, Math.min(98, percentage));
  needle.style.left = `${percentage}%`;
}

// Update Nutritional Suggestions based on BMI
function updateStatusAndDiet(bmi) {
  const statusTag = document.getElementById('bmi-status');
  const mascot = document.getElementById('mascot-emoji');
  const dietHeadline = document.getElementById('diet-headline');
  const dietSummary = document.getElementById('diet-summary');

  let foodKeys = [];

  if (bmi < 18.5) {
    statusTag.innerText = "Underweight";
    statusTag.className = "text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40";
    mascot.innerText = "🧘‍♂️";
    dietHeadline.innerText = "Calorie-Dense Surplus Protocol";
    dietSummary.innerText = "Focus on nutrient-dense healthy fats, complex carbs, and regular protein feedings to gain healthy mass safely.";
    foodKeys = ['banana', 'avocado', 'almonds', 'cottage'];
  } else if (bmi <= 24.9) {
    statusTag.innerText = "Healthy";
    statusTag.className = "text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
    mascot.innerText = "🏃‍♂️";
    dietHeadline.innerText = "Active Maintenance Protocol";
    dietSummary.innerText = "Maintain your current composition with varied whole foods, micronutrient balance, and proper hydration.";
    foodKeys = ['apple', 'broccoli', 'lentils', 'cottage'];
  } else if (bmi <= 29.9) {
    statusTag.innerText = "Overweight";
    statusTag.className = "text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40";
    mascot.innerText = "🚶‍♂️";
    dietHeadline.innerText = "High-Volume Fiber & Deficit Protocol";
    dietSummary.innerText = "Prioritize high-satiety low-calorie greens and lean proteins to support a gradual, healthy deficit.";
    foodKeys = ['apple', 'broccoli', 'lentils'];
  } else {
    statusTag.innerText = "Obese";
    statusTag.className = "text-xs px-2.5 py-0.5 rounded-full font-bold bg-red-500/20 text-red-300 border border-red-500/40";
    mascot.innerText = "🏋️‍♂️";
    dietHeadline.innerText = "Metabolic Reset Protocol";
    dietSummary.innerText = "Eliminate empty sugars and emphasize fibrous cruciferous vegetables and clean protein sources.";
    foodKeys = ['broccoli', 'lentils', 'apple'];
  }

  // Render food badges
  foodBadgesContainer.innerHTML = '';
  foodKeys.forEach(key => {
    const item = FOOD_DATABASE[key];
    const badge = document.createElement('button');
    badge.className = 'food-badge';
    badge.innerHTML = `<span>${item.icon}</span> <span>${item.name}</span>`;
    badge.onclick = () => openBuyModal(item);
    foodBadgesContainer.appendChild(badge);
  });
}

// Modal Handlers
function openBuyModal(item) {
  document.getElementById('modal-icon').innerText = item.icon;
  document.getElementById('modal-title').innerText = item.name;
  document.getElementById('modal-desc').innerText = item.desc;
  
  // Example affiliate query links
  const query = encodeURIComponent(item.name);
  document.getElementById('link-amazon').href = `https://www.amazon.com/s?k=${query}&tag=nutrifitapp-20`;
  document.getElementById('link-instacart').href = `https://www.instacart.com/store/s?k=${query}`;

  buyModal.classList.remove('hidden');
  buyModal.classList.add('flex');
}

function closeBuyModal() {
  buyModal.classList.add('hidden');
  buyModal.classList.remove('flex');
}

// Event Listeners
metricBtn.addEventListener('click', () => setUnit('metric'));
imperialBtn.addEventListener('click', () => setUnit('imperial'));
calcBtn.addEventListener('click', calculateBMI);
closeModalBtn.addEventListener('click', closeBuyModal);
buyModal.addEventListener('click', (e) => {
  if (e.target === buyModal) closeBuyModal();
});

// Run calculation on initial load
window.addEventListener('DOMContentLoaded', calculateBMI);
