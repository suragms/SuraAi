# 🤖 Sura AI – AI Chat Application

![GitHub Repo stars](https://img.shields.io/github/stars/suragms/SuraAi?style=flat&logo=github)
![GitHub last commit](https://img.shields.io/github/last-commit/suragms/SuraAi)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Status](https://img.shields.io/badge/Status-Active-success.svg)
![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React%20%7C%20TypeScript%20%7C%20Vite-blue)

> A modern, responsive **AI chat application** built using **React**, **TypeScript**, and **Vite**, delivering a clean, accessible, and beautiful interface to interact with AI models.

---

## ✨ Features
- **Modern Chat Interface** – Real-time messaging with a minimal and elegant UI.  
- **TypeScript Powered** – Strong typing ensures reliability and maintainability.  
- **shadcn/ui Components** – For a consistent and professional design system.  
- **Dark/Light Theme** – Dynamic theme switching with `next-themes`.  
- **Responsive Design** – Optimized for desktop, tablet, and mobile devices.  
- **Form Validation** – Integrated `react-hook-form` and `zod` for robust validation.  
- **State Management** – Fast and efficient data handling with TanStack Query.  
- **Smooth Navigation** – Powered by React Router DOM.

---

## 🛠 Tech Stack
- **Framework:** React 18 + TypeScript  
- **Build Tool:** Vite  
- **Styling:** Tailwind CSS + shadcn/ui  
- **UI Primitives:** Radix UI  
- **State Management:** TanStack Query (React Query)  
- **Forms:** React Hook Form + Zod  
- **Icons:** Lucide React  
- **Charts & Visuals:** Recharts  
- **Notifications:** Sonner  
- **Linting:** ESLint (TypeScript rules)

---

## 🚀 Installation & Setup
### Prerequisites
- Node.js 18+  
- npm, yarn, or bun  

### Setup
```bash
# Clone repository
git clone https://github.com/suragms/SuraAi.git
cd sura_ai

# Install dependencies
npm install      # or yarn install or bun install

# Start development server
npm run dev
````

Visit [http://localhost:5173](http://localhost:5173) to view the app.

---

## 📂 Project Structure

```bash
sura_ai/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, fonts, icons
│   ├── components/         # Reusable UI components
│   │   └── ui/             # shadcn/ui based components
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilities & configs
│   ├── pages/              # App pages
│   │   ├── Landing.tsx
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables
├── package.json            # Dependencies & scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

---

## 🎯 Scripts

* `npm run dev` – Start development server
* `npm run build` – Build for production
* `npm run preview` – Preview production build
* `npm run lint` – Run ESLint checks

---

## ⚙️ Configuration

Create a `.env` file in the project root:

```env
VITE_API_URL=your_api_endpoint
VITE_APP_NAME=Sura AI
```

---

## 🌐 Deployment

### Production Build

```bash
npm run build
```

Output files will be generated in `dist/`.

### Hosting Options

* **Vercel** (Recommended)
* **Netlify** – Build command: `npm run build` & publish `dist/`
* **GitHub Pages** – via GitHub Actions
* **Static Hosting** – Upload `dist/` to any hosting provider

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:

   ```bash
   git commit -m "Add new feature"
   ```
4. Push your branch:

   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** – see [LICENSE](LICENSE) for details.

---

## 📫 Contact

**Developed by [Surag](https://linktr.ee/suragdevstudio) – Founder of Surag Dev Studio**

* **LinkedIn**: [linkedin.com/in/suragsunil](https://linkedin.com/in/suragsunil)
* **GitHub**: [github.com/suragms](https://github.com/suragms)
* **Instagram**: [instagram.com/surag\_sunil](https://instagram.com/surag_sunil)
* **Email**: [officialsurag@gmail.com](mailto:officialsurag@gmail.com)
* **Location**: Kerala, India

---

### 🌟 Live Website

> **Coming Soon** – Services are now available.
> Reach out via the platforms above for early access!

---

```
