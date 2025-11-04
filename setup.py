import subprocess
import sys
import os

def run_command(command, description):
    """Run a shell command and print status"""
    print(f"\n{'='*60}")
    print(f"🚀 {description}")
    print(f"{'='*60}\n")
    
    try:
        if os.name == 'nt':  # Windows
            subprocess.run(command, shell=True, check=True)
        else:  # Unix/Linux/Mac
            subprocess.run(command, shell=True, check=True, executable='/bin/bash')
        print(f"✅ {description} - COMPLETE\n")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} - FAILED")
        print(f"Error: {e}\n")
        return False

def main():
    """One-command setup for the entire project"""
    
    print("""
    ╔════════════════════════════════════════════════════════════════╗
    ║                                                                ║
    ║     🚗 CarInsure AI - Complete Setup                          ║
    ║     AI-Powered Car Insurance Platform                         ║
    ║                                                                ║
    ╚════════════════════════════════════════════════════════════════╝
    """)
    
    # Change to backend directory
    backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
    frontend_dir = os.path.join(os.path.dirname(__file__), 'frontend')
    
    # Step 1: Install Python dependencies
    os.chdir(backend_dir)
    if not run_command(
        f"{sys.executable} -m pip install -r requirements.txt",
        "Installing Python dependencies"
    ):
        print("\n⚠️  Failed to install Python dependencies")
        return
    
    # Step 2: Download dataset
    if not run_command(
        f"{sys.executable} data_download.py",
        "Downloading and enhancing insurance dataset"
    ):
        print("\n⚠️  Failed to download dataset")
        return
    
    # Step 3: Preprocess data
    if not run_command(
        f"{sys.executable} preprocessing.py",
        "Preprocessing data and feature engineering"
    ):
        print("\n⚠️  Failed to preprocess data")
        return
    
    # Step 4: Train ML model
    if not run_command(
        f"{sys.executable} train_models.py",
        "Training AI premium prediction model"
    ):
        print("\n⚠️  Failed to train model")
        return
    
    # Step 5: Generate insights
    if not run_command(
        f"{sys.executable} generate_visualizations.py",
        "Generating user-friendly insights"
    ):
        print("\n⚠️  Failed to generate insights")
        return
    
    # Step 6: Install Node dependencies
    print(f"\n{'='*60}")
    print("📦 Installing Node.js dependencies")
    print(f"{'='*60}\n")
    print("Changing to frontend directory...")
    os.chdir(frontend_dir)
    
    if not run_command(
        "npm install",
        "Installing React and dependencies"
    ):
        print("\n⚠️  Failed to install Node dependencies")
        print("Please make sure Node.js and npm are installed:")
        print("Download from: https://nodejs.org/")
        return
    
    # Final success message
    print(f"\n{'='*60}")
    print("✅ SETUP COMPLETE!")
    print(f"{'='*60}\n")
    
    print("""
    🎉 Your CarInsure AI platform is ready!
    
    📁 Project Structure:
       backend/
         ├── data/insurance.csv (1,338 records)
         ├── models/premium_predictor.pkl (AI model)
         ├── visualization_data/*.json (12 insights)
         └── app.py (Flask API)
       
       frontend/
         ├── src/pages/ (Home, GetQuote, Insights, ComparePlans)
         └── package.json
    
    🚀 To start the application:
    
       1. Start Backend:
          cd backend
          python app.py
          
          Backend will run on: http://localhost:5000
    
       2. Start Frontend (in a new terminal):
          cd frontend
          npm start
          
          Frontend will run on: http://localhost:3000
    
    📊 Features Ready:
       ✓ AI-Powered Premium Prediction
       ✓ Interactive Quote Form
       ✓ 12 Data Insights
       ✓ Beautiful UI/UX
       ✓ Mobile Responsive
    
    🌟 Enjoy your production-ready car insurance platform!
    """)

if __name__ == "__main__":
    main()
