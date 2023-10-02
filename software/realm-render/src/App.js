import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Routes, Route}
  from 'react-router-dom';
import Home from './pages';
import MapEditor from './pages/mapEditor';
import Join from './pages/join';
import Test from './pages/test';

/**
 * Main function to return App component.
 * @return {App} object.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/mapEditor' element={<Test />} />
        <Route path='/index' element={<Home />} />
        <Route path='/join' element={<Join />} />
      </Routes>
    </Router>
  );
};

export default App;
