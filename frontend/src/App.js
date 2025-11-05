import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import GetQuote from './pages/GetQuote';
import Insights from './pages/Insights';
import Login from './pages/Login';
import Register from './pages/Register';
import ModelResults from './pages/ModelResults';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/model-results" element={<ModelResults />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
