//HOME PAGE index.js file
import React from 'react';
import { Link } from 'react-router-dom';
import background from '../RealmRenderWireframe1.drawio.svg';
 
const Home = () => {
    return (
        <div className="App">
            <header className="App-header">
            Realm Render
            </header>
            <div className="menuButtons">
                <Link to="/new" className="menuButtonItem"><p>New</p></Link>
                <Link to="/loadMap" className="menuButtonItem"><p>Load</p></Link>
                <Link to="/join" className="menuButtonItem"><p>Join</p></Link>
            </div>
            <img src={background} alt="background"></img>
        </div>
        
    );
    //background was removed from above
    
};
 
export default Home;