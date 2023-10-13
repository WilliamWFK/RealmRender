import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import Home from './pages';
import PlayerView from './pages/playerView';
import MapEditor from './pages/mapEditor';

/**
 * Main function to return App component.
 * @return {App} object.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/mapEditor' element={<MapEditor />} />
        <Route path='/index' element={<Home />} />
        <Route path='/playerView' element={<PlayerView />} />
      </Routes>
    </Router>
  );
};

export default App;
