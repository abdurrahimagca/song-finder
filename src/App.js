// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import HomePage from './HomePage';
import NewPage from './NewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/newpage" element={<NewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
