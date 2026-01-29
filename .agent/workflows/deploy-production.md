---
description: Setup and deploy a Vite + Supabase project to Vercel with verified configurations
---

# Production Deployment Workflow

This workflow ensures your project is correctly configured for Vercel deployment, avoiding common pitfalls like 404s, missing environment variables, or dirty git states.

## 1. Prerequisites Check
1. Ensure `vercel.json` exists in root:
```json
{
  "buildCommand": "cd src && npm run build",
  "outputDirectory": "src/dist",
  "installCommand": "cd src && npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
2. Ensure `vite.config.js` binds to network:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  }
})
```

## 2. Git Synchronization
// turbo
1. Check git status to ensure tree is clean
   `git status`
2. Push latest changes to remote
   `git push origin main`

## 3. Vercel Deployment
1. verify login status (will prompt if needed)
   `npx -y vercel whoami`
2. Link project (if not linked)
   `npx -y vercel link`
3. Trigger Production Deployment
   `npx -y vercel --prod`

## 4. Verification
1. Open the production URL returned by the previous command.
2. Check `/mystory` to verify assets loaded.
