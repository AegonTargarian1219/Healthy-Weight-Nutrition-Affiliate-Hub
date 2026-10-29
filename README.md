# NutriiFit | Smart Health, Nutrition & Fitness Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**NutriiFit** is an all-in-one health, nutrition, and exercise advisory web platform designed for high-conversion affiliate marketing. It calculates healthy weight ranges using clinical BMI benchmarks, provides targeted whole-food meal plans, and showcases exercise postures using **animated die-cut gym athlete stickers**.

---

## 🌟 What's New in NutriiFit

- **Die-Cut Graphic Stickers with Movable Exercise Animations:**
  - High-detail vector bodybuilder stickers (thick die-cut border, realistic muscle contours, athletic caps, and weights) styled like the reference character.
  - Animated mechanics:
    - **Bicep Curls:** Arm curls the dumbbell up and down dynamically with peak contraction.
    - **Squats:** Lifter squats down into the pocket with loaded barbell and plates.
    - **Bench Press:** Barbell moves through eccentric and concentric pressing motions.
    - **Romanian Deadlifts (RDL):** Torso hinges at the hips demonstrating safe hamstring stretch.
    - **Cardio & Push-Ups:** Running gait tempo and bodyweight plank pressing animations.
- **Top Corner Country & Currency Selector:**
  - Dropdown supporting **India (₹ INR)**, **United States ($ USD)**, **United Kingdom (£ GBP)**, **Canada ($ CAD)**, **Australia ($ AUD)**, and **UAE (AED)**.
  - Dynamically updates retailer links (Amazon India, Blinkit, Instamart, Zepto, HealthKart, Amazon Fresh US, Instacart, Tesco UK, etc.) and auto-converts local prices.
- **Rebranded to NutriiFit:**
  - Modern brand styling with high-vibrancy blue, red, and yellow animated background, glassmorphism cards, and popping buttons.

---

## 📂 File Structure

```
NutriiFit-App/
├── index.html        # Clean 3-view structure (Calc -> Food -> Exercises) + Country Dropdown
├── style.css         # Die-cut sticker shadows, CSS keyframe animations, 3D popping buttons
├── script.js         # BMI calculations, vectorized animated stickers, country/affiliate engine
├── README.md         # Documentation & setup guide
├── LICENSE           # MIT Open-Source License
└── .gitignore        # Standard exclusions
```

---

## 🚀 How to Upload to GitHub & Deploy

1. Clone or create a new repository on your GitHub account (e.g., `nutriifit`).
2. Extract this ZIP archive into your local repository directory.
3. Commit and push:
   ```bash
   git init
   git add .
   git commit -m "feat: launch NutriiFit with movable stickers and country selector"
   git branch -M main
   git remote add origin https://github.com/<your-username>/nutriifit.git
   git push -u origin main
   ```
4. **Deploy for free:**
   - Go to your repository's **Settings > Pages**.
   - Under **Build and deployment**, pick `main` branch and `/ (root)` folder.
   - Click **Save**. Your site will be live at `https://<your-username>.github.io/nutriifit/`.

---

## 📄 License
MIT License.