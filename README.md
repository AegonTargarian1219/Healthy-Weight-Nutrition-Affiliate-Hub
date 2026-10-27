# FitPulse | Healthy Weight & Fitness Affiliate Marketing Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A modern, responsive single-page application built for affiliate marketing, clinical healthy weight estimation, personalized nutrition plans, and gym routines tailored to Body Mass Index (BMI).

---

## ✨ Features

- **Clinical BMI & Weight Range Engine:**
  - Standard WHO categories for adults (<18.5 Underweight, 18.5 - 24.9 Normal, 25 - 29.9 Overweight, 30+ Obese).
  - Geriatric clinical adjustment (ages 65+) providing an adjusted reference buffer ($22.0 - 27.0\ 	ext{kg/m}^2$).
  - Seamless unit toggle between **Metric** (cm, kg) and **Imperial** (ft/in, lbs).
  - Dynamic BMI gauge bar with real-time pointer alignment.

- **Dynamic Body Composition Mascots:**
  - Real-time animated vector avatar stickers that adjust based on the user's BMI (Leaner character, Athletic high-five star, Motivated headband character).

- **High-Converting Affiliate Nutrition Hub:**
  - Calibrated diet plans (Clean Caloric Surplus, Metabolic Maintenance, Satiety Deficit).
  - Interactive "Where to Buy" modal offering multi-retailer deep links (**Amazon Fresh**, **Instacart**, **iHerb / Whole Foods**).
  - Built-in 1-click discount coupon code copy with toast feedback.
  - Transparent FTC affiliate marketing disclosures.

- **Advanced Gym Exercises & Supplement Engine:**
  - Posture-illustrated compound gym routines with specific sets, reps, and target muscle groups.
  - Curated supplement recommendations (Creatine Monohydrate, Whey Isolate, Mass Gainers, Multivitamins) complete with direct purchase links.

- **UI / UX Polish:**
  - Blue, Red, and Yellow multi-stop animated gradient background with glowing ambient orbs.
  - Frosted glassmorphism containers (`backdrop-filter: blur(20px)`).
  - Tactile 3D popping buttons with custom hover elevations and active push-down feedback.

---

## 🚀 Live Demo & Deployment

This project is completely static (no backend required). You can deploy it instantly on:

### Deploy to GitHub Pages:
1. Push this repository to your GitHub account.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, select `main` (or `master`) branch and `/ (root)` folder.
4. Click **Save**. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Deploy to Vercel / Netlify / Cloudflare Pages:
- Simply drag and drop the folder into Netlify Drop, or connect the GitHub repository to Vercel or Cloudflare Pages.

---

## 📂 Repository File Structure

```
├── index.html          # Main HTML structure with 3 structured views & modals
├── style.css           # Custom CSS for gradients, glassmorphism, 3D buttons & keyframes
├── script.js           # Core state machine, BMI math, dynamic SVG mascots & affiliate modals
├── LICENSE             # MIT open-source license
├── .gitignore          # Git exclusion rules for OS files & IDE caches
└── README.md           # Project documentation and setup guide
```

---

## 🛠️ Configuration & Affiliate ID Customization

To insert your personal affiliate IDs for monetization:

1. Open `script.js`.
2. Search for `fitpulse-20` and replace it with your own Amazon Associates tracking ID:
   ```javascript
   `https://www.amazon.com/s?k=${encodedQuery}&tag=YOUR_AMAZON_TAG`
   ```
3. Update Instacart, iHerb, or local affiliate links as needed in the `openAffiliateModal` and `renderWorkoutSection` functions.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.