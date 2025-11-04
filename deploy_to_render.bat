@echo off
echo ════════════════════════════════════════════════════════
echo   🚀 Deploying CarInsure AI to Render.com
echo ════════════════════════════════════════════════════════
echo.

REM Check if git is initialized
if not exist ".git" (
    echo 📦 Initializing Git repository...
    git init
    echo ✅ Git initialized
    echo.
)

REM Check if remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ⚠️  No Git remote found!
    echo.
    echo Please add your GitHub repository URL:
    echo git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
    echo.
    pause
)

REM Add all files
echo 📝 Adding files to Git...
git add .

REM Commit
echo 💾 Creating commit...
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Deploy CarInsure AI to Render
git commit -m "%commit_msg%"

REM Push to GitHub
echo ⬆️  Pushing to GitHub...
git push -u origin main
if errorlevel 1 git push

echo.
echo ════════════════════════════════════════════════════════
echo   ✅ Code pushed to GitHub!
echo ════════════════════════════════════════════════════════
echo.
echo 🎯 Next Steps:
echo.
echo 1. Go to https://render.com and sign in
echo 2. Click 'New +' -^> 'Blueprint'
echo 3. Connect your GitHub repository
echo 4. Render will detect render.yaml automatically
echo 5. Click 'Apply' to deploy
echo.
echo 6. After deployment, configure the frontend:
echo    - Go to your frontend service
echo    - Add Environment Variable:
echo      Key: REACT_APP_API_URL
echo      Value: https://YOUR_BACKEND_URL.onrender.com
echo.
echo 7. Wait for builds to complete (~10-15 minutes)
echo.
echo 🌐 Your app will be live at:
echo    Frontend: https://carinsure-ai-frontend.onrender.com
echo    Backend: https://carinsure-ai-backend.onrender.com
echo.
echo ════════════════════════════════════════════════════════
pause
