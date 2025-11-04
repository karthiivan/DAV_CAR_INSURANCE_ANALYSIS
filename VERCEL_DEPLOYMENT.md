# Vercel Deployment Guide

## 🚀 Step-by-Step Deployment Instructions

### **Step 1: Initialize Git Repository**

```powershell
cd "c:\Users\vanga\OneDrive\Desktop\dav vscode project"
git init
git add .
git commit -m "Initial commit: CarInsure AI platform"
```

### **Step 2: Create GitHub Repository**

1. Go to https://github.com/new
2. Create a new repository called `car-insure-ai`
3. Don't initialize with README (we already have files)
4. Click "Create repository"

### **Step 3: Push to GitHub**

```powershell
git remote add origin https://github.com/YOUR-USERNAME/car-insure-ai.git
git branch -M main
git push -u origin main
```

### **Step 4: Deploy to Vercel**

1. Go to https://vercel.com
2. Sign up / Log in with GitHub
3. Click "New Project"
4. Select "Import Git Repository"
5. Select `car-insure-ai` repository
6. **Project Settings:**
   - Framework Preset: **Create React App**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

7. **Environment Variables:**
   - Add key: `REACT_APP_API_URL`
   - Add value: `YOUR_VERCEL_DEPLOYMENT_URL/api`

8. Click "Deploy"

### **Step 5: Configure API Proxy**

For the backend API to work, add to `frontend/package.json`:

```json
"proxy": "http://localhost:5000"
```

Or add to `frontend/.env.production`:

```
REACT_APP_API_URL=https://your-project-name.vercel.app/api
```

### **Step 6: Deploy Backend (Optional - For API)**

The backend files are in the `api/` folder configured as serverless functions:

- Create `/api/index.py` ✅ Already created
- Vercel will automatically detect and deploy Python serverless functions
- Your Flask app will be available at `YOUR_URL/api/*`

---

## 📋 File Structure for Vercel

```
project/
├── api/
│   └── index.py              (Backend serverless function)
├── frontend/                 (React app)
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── build/               (Generated after build)
├── backend/                 (Local development)
│   ├── models/
│   ├── data/
│   └── visualization_data/
├── vercel.json             (Deployment config)
├── .env.production         (Env variables)
└── package.json            (Root package)
```

---

## 🔑 Key Features Deployed

✅ React Frontend (SPA)
✅ Flask Backend (Serverless API)
✅ ML Model predictions
✅ Data visualizations
✅ Dark theme UI
✅ 14 unique features

---

## ⚠️ Important Notes

1. **Model Files**: The ML model files must be committed to Git (they're in `backend/models/`)
2. **Data Files**: Insurance data in `backend/data/` needs to be included
3. **Environment Variables**: Update `REACT_APP_API_URL` after deployment
4. **CORS**: Already enabled in Flask app
5. **Build Size**: Monitor as ML models can be large

---

## 🎯 Alternative: Use Render + Vercel

If you want separate deployments:
- **Frontend**: Deploy React to Vercel
- **Backend**: Deploy Flask to Render.com (free tier available)

Update `REACT_APP_API_URL` to point to your Render backend.

---

## 📞 Support

After deployment:
1. Visit: `https://your-project-name.vercel.app`
2. Check logs in Vercel dashboard
3. API health: `https://your-project-name.vercel.app/api/health`

**Happy deploying!** 🚀
