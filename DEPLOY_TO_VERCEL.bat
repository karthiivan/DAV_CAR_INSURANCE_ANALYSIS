@echo off
REM CarInsure AI - Vercel Deployment Script

echo.
echo ════════════════════════════════════════════════════════
echo   🚀 CarInsure AI - Deploy to Vercel
echo ════════════════════════════════════════════════════════
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
echo ════════════════════════════════════════════════════════
echo   📋 DEPLOYMENT INSTRUCTIONS
echo ════════════════════════════════════════════════════════
echo.
echo STEP 1: CREATE GITHUB REPOSITORY
echo    1. Go to https://github.com/new
echo    2. Repository name: car-insurance-ai
echo    3. Click "Create repository" (don't initialize)
echo.
echo STEP 2: PUSH TO GITHUB
echo    Run these commands:
echo    ──────────────────────────────────────
echo    git remote add origin https://github.com/YOUR_USERNAME/car-insurance-ai.git
echo    git branch -M main
echo    git push -u origin main
echo    ──────────────────────────────────────
echo.
echo STEP 3: DEPLOY TO VERCEL (EASIEST METHOD)
echo    1. Go to https://vercel.com
echo    2. Sign in with GitHub
echo    3. Click "Add New..." -^> "Project"
echo    4. Import your repository
echo    5. Vercel auto-detects settings!
echo    6. Click "Deploy" - That's it!
echo.
echo    ✅ NO manual configuration needed!
echo    ✅ vercel.json handles everything
echo    ✅ API routes auto-configured
echo.
echo STEP 4: YOUR LIVE LINK
echo    Frontend: https://car-insurance-ai.vercel.app
echo    Backend:  https://car-insurance-ai.vercel.app/api
echo.
echo ════════════════════════════════════════════════════════
echo.
echo Git status:
echo.
git status
echo.
echo ════════════════════════════════════════════════════════
echo   Ready to deploy! Follow the instructions above.
echo ════════════════════════════════════════════════════════
echo.
pause
