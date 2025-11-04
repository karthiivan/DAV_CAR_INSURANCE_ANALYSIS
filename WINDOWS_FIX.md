# 🔧 QUICK FIX GUIDE - Python 3.14 Issue

## ⚠️ Problem
You're using Python 3.14 which is very new. Pandas/NumPy don't have pre-built wheels for it yet, 
and building from source requires C++ compiler (Visual Studio Build Tools).

## ✅ SOLUTIONS (Choose One)

### **OPTION 1: Use Pre-built Wheels (EASIEST - 2 minutes)**

Run these commands in PowerShell from the backend folder:

```powershell
cd backend

# Upgrade pip
pip install --upgrade pip

# Install with pre-built wheels only
pip install --only-binary :all: numpy pandas scikit-learn flask flask-cors requests joblib
```

If that works, continue with:
```powershell
python data_download.py
python preprocessing.py
python train_models.py
python generate_visualizations.py
```

---

### **OPTION 2: Use Windows Setup Script (RECOMMENDED)**

From the project root folder, run:

```powershell
.\setup.bat
```

This will automatically handle everything!

---

### **OPTION 3: Install Python 3.11 or 3.12 (SAFEST - 10 minutes)**

1. Download Python 3.11 or 3.12 from: https://www.python.org/downloads/
2. Install it (check "Add to PATH")
3. Open NEW PowerShell and run:
   ```powershell
   python --version  # Should show 3.11.x or 3.12.x
   cd "C:\Users\vanga\OneDrive\Desktop\dav vscode project"
   .\setup.bat
   ```

---

### **OPTION 4: Install Visual Studio Build Tools (15 minutes)**

If you want to keep Python 3.14:

1. Download: https://visualstudio.microsoft.com/downloads/
2. Install "Build Tools for Visual Studio 2022"
3. During installation, select:
   - Desktop development with C++
   - Windows 10/11 SDK
4. Restart computer
5. Run setup.bat

---

## 🚀 AFTER FIX - Start the App

**Terminal 1 (Backend):**
```powershell
cd backend
python app.py
```

**Terminal 2 (Frontend):**
```powershell
cd frontend
npm start
```

---

## 🎯 Quick Check

Before running app.py, make sure these exist:
- `backend/data/insurance.csv`
- `backend/models/premium_predictor.pkl`
- `backend/visualization_data/*.json` (12 files)

If missing, run the data pipeline:
```powershell
cd backend
python data_download.py
python preprocessing.py
python train_models.py
python generate_visualizations.py
```

---

## 📝 Current Issue Explained

The error shows:
```
ERROR: Unknown compiler(s): [['cl'], ['gcc'], ['clang']]
```

This means Python is trying to compile NumPy/Pandas from source code (because no pre-built 
wheel exists for Python 3.14 yet) but can't find a C++ compiler.

**Solution**: Use Option 1 (pre-built wheels) or Option 3 (older Python version)
