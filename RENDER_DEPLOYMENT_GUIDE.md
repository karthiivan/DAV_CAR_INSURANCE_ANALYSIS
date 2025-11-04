# 🚀 Deploy CarInsure AI to Render.com

## 📋 Prerequisites

1. **GitHub Account** - Your code must be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **Push your code to GitHub** first

---

## 🎯 Quick Deploy (Using Blueprint)

### Step 1: Push to GitHub

```powershell
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - CarInsure AI Platform"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml`
5. Click **"Apply"** to deploy both backend and frontend

### Step 3: Configure Environment Variables

After deployment, go to your **frontend service** and add:
- **Key**: `REACT_APP_API_URL`
- **Value**: Your backend URL (e.g., `https://carinsure-ai-backend.onrender.com`)

### Step 4: Wait for Build

- Backend: ~10-15 minutes (includes model training)
- Frontend: ~5 minutes

---

## 🔧 Manual Deployment (Alternative)

### Deploy Backend

1. **New Web Service**
   - Environment: `Python`
   - Build Command:
     ```bash
     cd backend
     pip install -r requirements.txt
     python data_download.py || echo "Data exists"
     python preprocessing.py || echo "Processed"
     python train_models.py || echo "Trained"
     python generate_visualizations.py || echo "Visualized"
     ```
   - Start Command:
     ```bash
     cd backend && gunicorn app:app
     ```

2. **Environment Variables**
   - `PYTHON_VERSION`: `3.11.0`
   - `PORT`: `5000`

### Deploy Frontend

1. **New Static Site**
   - Build Command:
     ```bash
     cd frontend
     npm install
     npm run build
     ```
   - Publish Directory: `frontend/build`

2. **Environment Variables**
   - `REACT_APP_API_URL`: `https://YOUR_BACKEND_URL.onrender.com`

3. **Rewrite Rules**
   - Add rule to handle React Router:
   - Source: `/*`
   - Destination: `/index.html`

---

## 📝 Important Notes

### ⚠️ Free Tier Limitations

- **Spin down after inactivity**: First request may take 30-50 seconds
- **750 hours/month** free (both services combined)
- **Automatic SSL** included

### 🔄 Auto-Deploy

- Enabled by default in `render.yaml`
- Every push to `main` branch triggers rebuild

### 📊 Model Training

- Initial build takes longer (~10-15 min) due to ML model training
- Subsequent builds are faster if model files exist

### 🌐 Access Your App

After deployment:
- **Frontend**: `https://carinsure-ai-frontend.onrender.com`
- **Backend API**: `https://carinsure-ai-backend.onrender.com`

---

## 🐛 Troubleshooting

### Backend Build Fails

```bash
# Check if requirements.txt is in backend folder
# Ensure gunicorn is in requirements.txt
```

### Frontend Can't Connect to Backend

1. Verify `REACT_APP_API_URL` environment variable
2. Check CORS settings in `backend/app.py`
3. Rebuild frontend after changing env variables

### Model Training Timeout

- Free tier has 15-minute build limit
- If timeout occurs, pre-train models locally and commit them:
  ```bash
  cd backend
  python train_models.py
  git add models/*
  git commit -m "Add pre-trained models"
  git push
  ```

---

## 💡 Pro Tips

1. **Use Blueprint**: Fastest deployment with `render.yaml`
2. **Pre-commit Models**: Faster builds, skip training step
3. **Monitor Logs**: Check service logs for errors
4. **Custom Domain**: Free custom domain support on Render
5. **Health Checks**: Automatic health monitoring included

---

## 🎉 Success Checklist

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Blueprint deployed (or manual services created)
- [ ] Backend service running (green status)
- [ ] Frontend service running (green status)
- [ ] `REACT_APP_API_URL` configured
- [ ] Frontend can communicate with backend
- [ ] Test quote form works end-to-end

---

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [Blueprint Spec](https://render.com/docs/blueprint-spec)
- [Python on Render](https://render.com/docs/deploy-flask)
- [Static Sites on Render](https://render.com/docs/static-sites)

---

## 📧 Need Help?

If deployment fails:
1. Check Render service logs
2. Verify all file paths are correct
3. Ensure GitHub repo is public (or Render has access)
4. Check Python/Node versions match

**Your live app will be available at:**
- https://carinsure-ai-frontend.onrender.com
