# 🚀 QUICK START GUIDE - CarInsure AI

## ⚡ Fastest Way to Get Started

### Step 1: Run Setup (One Command!)

```bash
python setup.py
```

This single command will:
- ✅ Install all Python dependencies
- ✅ Download 1,338 real insurance records
- ✅ Preprocess and clean the data
- ✅ Train the AI model (takes 3-5 minutes)
- ✅ Generate 12 insight visualizations
- ✅ Install Node.js dependencies

### Step 2: Start Backend

Open a terminal and run:

```bash
cd backend
python app.py
```

You should see:
```
🚀 Loading ML model and artifacts...
✅ Backend ready!
 * Running on http://127.0.0.1:5000
```

### Step 3: Start Frontend

Open a NEW terminal and run:

```bash
cd frontend
npm start
```

The browser will automatically open at `http://localhost:3000`

---

## 🎉 That's It!

Your complete car insurance platform is now running!

### What You Can Do:

1. **Browse the beautiful landing page** at http://localhost:3000
2. **Get an instant quote** by clicking "Get Free Quote"
3. **View data insights** at the Insights page
4. **Compare plans** side-by-side

---

## 📁 Project Structure

```
car-insurance-platform/
├── backend/
│   ├── data/                  # Insurance datasets
│   ├── models/                # Trained ML model
│   ├── visualization_data/    # 12 insight JSON files
│   ├── app.py                 # Flask API (port 5000)
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/            # 4 pages (Home, Quote, Insights, Compare)
│   │   └── components/       # Navbar, Footer
│   └── package.json
│
└── setup.py                   # One-command setup
```

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError`
```bash
cd backend
pip install -r requirements.txt
```

**Problem**: No data files
```bash
cd backend
python data_download.py
python preprocessing.py
python train_models.py
python generate_visualizations.py
```

### Frontend Issues

**Problem**: `npm command not found`
- Install Node.js from https://nodejs.org/

**Problem**: Dependencies missing
```bash
cd frontend
npm install
```

**Problem**: Can't connect to backend
- Make sure backend is running on port 5000
- Check `app.py` is running without errors

### Port Issues

**Backend using different port?**
Edit `frontend/src/pages/GetQuote.js` and `frontend/src/pages/Insights.js`:
```javascript
const API_URL = 'http://localhost:YOUR_PORT';
```

---

## 📊 Test the Features

### 1. Get a Quote
- Go to "Get Quote" page
- Fill in:
  - Age: 28
  - Gender: Male
  - Smoker: No
  - Brand: Toyota
  - Year: 2020
  - Mileage: 15,000 km
  - Fuel: Petrol
  - Usage: Personal
- Click "Get My Quote"
- See AI-powered pricing!

### 2. View Insights
- Click "Insights" in navbar
- Browse through 8 tabs:
  - Vehicle brands
  - Age groups
  - Smoking impact
  - Mileage effects
  - Vehicle age
  - Fuel types
  - Location
  - Savings tips

### 3. Compare Plans
- Click "Compare Plans"
- See side-by-side comparison
- Basic vs Standard vs Premium

---

## 💡 Understanding the AI

### How It Works:
1. **Data**: 1,338 real insurance records
2. **Features**: 15 variables (age, vehicle, lifestyle)
3. **Model**: Gradient Boosting Regressor
4. **Accuracy**: ~85-90% R² score
5. **Speed**: Predictions in < 1 second

### Key Factors That Affect Price:
- 🚬 Smoking status (biggest impact!)
- 👤 Age (young drivers pay more)
- 🚗 Vehicle brand (luxury = expensive)
- 🛣️ Annual mileage (more driving = higher cost)
- ⛽ Fuel type (electric gets discount)
- 🏢 Usage (commercial costs more)

---

## 🎨 Customization

### Change Colors:
Edit `frontend/src/index.css` - look for:
- Primary: `#1E3A8A` (Navy Blue)
- Accent: `#10B981` (Emerald Green)

### Add More Features:
1. **Backend**: Edit `backend/app.py` to add endpoints
2. **Frontend**: Create new pages in `frontend/src/pages/`

### Update Data:
- Add more records to `backend/data/insurance.csv`
- Retrain: `python train_models.py`

---

## 📱 Mobile Responsive

The entire site is mobile-first:
- ✅ Works on phones (320px+)
- ✅ Works on tablets
- ✅ Works on desktops
- ✅ Touch-friendly buttons
- ✅ Responsive charts

---

## 🚀 Next Steps

### Deploy Your App:

**Backend** (Flask):
- Heroku, AWS, DigitalOcean, Railway

**Frontend** (React):
- Vercel, Netlify, GitHub Pages

**Database** (Optional):
- PostgreSQL, MongoDB for storing quotes

---

## 📞 Need Help?

1. Check the main README.md
2. Review error messages carefully
3. Ensure Python 3.8+ and Node 14+ installed
4. Try running setup.py again

---

## ✅ Checklist

- [ ] Python 3.8+ installed
- [ ] Node.js 14+ installed
- [ ] Run `python setup.py`
- [ ] Backend running on :5000
- [ ] Frontend running on :3000
- [ ] Can see homepage
- [ ] Can get a quote
- [ ] Can view insights

---

**🎉 Enjoy Your AI-Powered Car Insurance Platform!**

Made with ❤️ and 🤖
