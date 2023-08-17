//HOME PAGE index.js file
import React from 'react';
import background from '../RealmRenderWireframe1.drawio.svg';
 
const Home = () => {
    return (
        <div className="App">
            <header className="App-header">
            Realm Render
            </header>
            <div className="menuButtons">
            <a href="#" className="menuButtonItem"><p>New</p></a>
            <a href="#" className="menuButtonItem"><p>Load</p></a>
            <a href="#" className="menuButtonItem"><p>Join</p></a>
            </div>
            
        </div>
    );
    //background was removed from above
    //<img src={background} alt="background"></img>
};
 
export default Home;