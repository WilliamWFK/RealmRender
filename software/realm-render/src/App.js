import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Routes, Route}
  from 'react-router-dom';
import Home from './pages';
import MapEditor from './pages/mapEditor';
import Join from './pages/join';
import NewMap from './pages/newMap';
import CreateMap from './pages/createMap';

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
        <Route path='/join' element={<Join />} />
        <Route path='/newMap' element={<NewMap />} />
        <Route path='/createMap' element={<CreateMap />} /> 
      </Routes>
    </Router>
  );
};

export default App;
