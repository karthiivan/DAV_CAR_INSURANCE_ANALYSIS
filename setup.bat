@echo off
echo ============================================================
echo    CAR INSURANCE AI - Windows Setup
echo ============================================================
echo.

echo Checking Python version...
python --version
echo.

echo ============================================================
echo Installing Python dependencies...
echo ============================================================
cd backend
pip install --upgrade pip
pip install flask flask-cors requests joblib
pip install --only-binary :all: numpy pandas scikit-learn

if errorlevel 1 (
    echo.
    echo ERROR: Failed to install dependencies!
    echo.
    echo SOLUTION: Your Python version might be too new.
    echo Try installing Python 3.11 or 3.12 from:
    echo https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo Downloading and processing data...
echo ============================================================
python data_download.py
if errorlevel 1 (
    echo ERROR: Failed to download data
    pause
    exit /b 1
)

echo.
echo ============================================================
echo Preprocessing data...
echo ============================================================
python preprocessing.py
if errorlevel 1 (
    echo ERROR: Failed to preprocess data
    pause
    exit /b 1
)

echo.
echo ============================================================
echo Training AI model (this takes 3-5 minutes)...
echo ============================================================
python train_models.py
if errorlevel 1 (
    echo ERROR: Failed to train model
    pause
    exit /b 1
)

echo.
echo ============================================================
echo Generating insights...
echo ============================================================
python generate_visualizations.py
if errorlevel 1 (
    echo ERROR: Failed to generate insights
    pause
    exit /b 1
)

cd ..\frontend
echo.
echo ============================================================
echo Installing Node dependencies...
echo ============================================================
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install Node dependencies
    echo Make sure Node.js is installed from https://nodejs.org/
    pause
    exit /b 1
)

cd ..
echo.
echo ============================================================
echo SUCCESS! Setup Complete!
echo ============================================================
echo.
echo To start the application:
echo.
echo 1. Start Backend (Terminal 1):
echo    cd backend
echo    python app.py
echo.
echo 2. Start Frontend (Terminal 2):
echo    cd frontend
echo    npm start
echo.
echo Then open: http://localhost:3000
echo.
pause
