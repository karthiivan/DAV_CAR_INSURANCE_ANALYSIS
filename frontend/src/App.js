import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import GetQuote from './pages/GetQuote';
import Insights from './pages/Insights';
import ComparePlans from './pages/ComparePlans';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/compare-plans" element={<ComparePlans />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
