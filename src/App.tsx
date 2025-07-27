import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import { MemoryProvider } from './contexts/MemoryContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <MemoryProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/timeline" element={<TimelinePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </MemoryProvider>
  );
}

export default App;
