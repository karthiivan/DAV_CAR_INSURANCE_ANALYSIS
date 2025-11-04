@echo off
REM CarInsure AI - Vercel Deployment Script

echo.
echo ========================================
echo  CarInsure AI - Vercel Setup Script
echo ========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo Initializing Git repository...
    git init
    echo.
)

REM Add all files
echo Adding files to Git...
git add .
echo.

REM Create initial commit
echo Creating initial commit...
git commit -m "Initial commit: CarInsure AI - AI-powered insurance analytics platform" -q
if %errorlevel% neq 0 (
    echo Already committed or no changes to commit
)
echo.

REM Display instructions
echo.
echo ========================================
echo  DEPLOYMENT INSTRUCTIONS
echo ========================================
echo.
echo 1. CREATE GITHUB REPOSITORY:
echo    - Go to https://github.com/new
echo    - Create repository named: car-insure-ai
echo    - Click "Create repository" (don't initialize)
echo.
echo 2. CONNECT TO GITHUB:
echo    Open PowerShell and run:
echo    ----
echo    git remote add origin https://github.com/YOUR-USERNAME/car-insure-ai.git
echo    git branch -M main
echo    git push -u origin main
echo    ----
echo.
echo 3. DEPLOY TO VERCEL:
echo    - Go to https://vercel.com
echo    - Sign in with GitHub
echo    - Click "New Project"
echo    - Import your "car-insure-ai" repository
echo    - Framework: Create React App
echo    - Root Directory: frontend
echo    - Build Command: npm run build
echo    - Output Directory: build
echo    - Add Environment Variable:
echo      Key: REACT_APP_API_URL
echo      Value: https://your-project.vercel.app/api
echo    - Click "Deploy"
echo.
echo 4. VERIFY DEPLOYMENT:
echo    - Your app will be live at: https://your-project.vercel.app
echo    - Check backend health: https://your-project.vercel.app/api/health
echo.
echo ========================================
echo.
echo Git status:
echo.
git status
echo.
echo ========================================
echo Ready to deploy! Follow the instructions above.
echo ========================================
