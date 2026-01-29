---
description: Bootstrap a new Antigravity-ready web app with verified stack and configurations
---

# New Project Setup Workflow

This workflow initializes a new web application with the "Heaven on Earth" technical stack: Vite + React, Tailwind CSS, Framer Motion, and Vercel-ready configuration.

## 1. Project Initialization
1. Initialize Vite project in current directory
   `npm create vite@latest . -- --template react`
2. Install dependencies
   `npm install`
3. Install Core Stack Libraries
   `npm install react-router-dom framer-motion lucide-react clsx tailwind-merge`
4. Install & Init Tailwind CSS
   `npm install -D tailwindcss postcss autoprefixer`
   `npx tailwindcss init -p`

## 2. Configuration Setup
1. **Configure Tailwind (`tailwind.config.js`)**
   Update `content` array to include all source files:
   ```javascript
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {
         colors: {
           'heaven-dark': '#0a1a1a', // Example custom token
           'heaven-emerald': '#10b981',
         }
       },
     },
     plugins: [],
   }
   ```

2. **Setup Global Styles (`src/index.css`)**
   Replace default CSS with Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   /* Add custom base styles here */
   body {
     @apply bg-slate-950 text-slate-50;
   }
   ```

3. **Verify Vite Config (`vite.config.js`)**
   Ensure server host is enabled for debugging:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     server: {
       host: true,
       port: 5173
     }
   })
   ```

4. **Add Vercel Config (`vercel.json`)**
   Create file in root:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

## 3. Directory Structure
// turbo
1. Create standard folders
   `mkdir src/pages`
   `mkdir src/components`
   `mkdir src/layouts`
   `mkdir src/hooks`
   `mkdir src/assets`

## 4. Git Initialization
// turbo
1. Initialize Git
   `git init`
2. Create .gitignore (if missing) or append
   `echo ".env" >> .gitignore`
3. Initial Commit
   `git add .`
   `git commit -m "feat: initial project setup with verified stack"`

## 5. Development Start
1. Start the dev server
   `npm run dev`
