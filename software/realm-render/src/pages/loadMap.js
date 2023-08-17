import React from "react";
import { Link } from 'react-router-dom';

const LoadMap = () => {
    return (
        <div>
            <h1>
                Load Map
            </h1>
            <Link to="/index" className="menuButtonItem"><p>Home</p></Link>
        </div>
    );
};
 
export default LoadMap;