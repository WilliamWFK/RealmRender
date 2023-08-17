import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages';
import LoadMap from './pages/loadMap';

/**
 * Main function to return App component.
 * @return {App} object.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/loadMap' element={<LoadMap />} />
        <Route path='/index' element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;