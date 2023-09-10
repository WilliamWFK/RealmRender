import React from "react";
import '../styles/NewMap.css';
import { Link } from 'react-router-dom';

const NewMap = () => {
    return (
      <div className="NewMap">
        <div className="NewMapForm">
          <h1>New Map</h1>
          <Link to="/index"><p>Home</p></Link>
        </div>
      </div>
    );
  };

export default NewMap;