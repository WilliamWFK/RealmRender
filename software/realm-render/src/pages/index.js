// HOME PAGE index.js file
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import background from '../RealmRenderWireframe1.drawio.svg';

const Home = () => {
  const [menumode, setMenumode] = useState(0);
  const [sliderValue, setValue] = useState(5);

  function menuContents() {
    if (menumode === 0) {
      return (
        <div className="menuButtons">
          <div onClick={() => { setMenumode(1) }} className="menuButtonItem"><p>New</p></div>
          <Link to="/loadMap" className="menuButtonItem"><p>Load</p></Link>
          <Link to="/join" className="menuButtonItem"><p>Join</p></Link>
        </div>
      );
    } else if (menumode === 1) {
      return (
        <div className="createForm ">
          <h1>Options</h1>
          <div className="settingForm">
            <div>setting:</div>
            <input type="text" id="setting1" name="setting1"></input>
            <div>setting two:</div>
            <label for="setting2">{sliderValue}</label>
            <input type="range" min="0" max="10" value={sliderValue} onInput={(e) => setValue(e.target.value)} id="setting2" name="setting2"></input>
          </div>
          <div className="navButtons">
            <div className="backButton" onClick={() => { setMenumode(0) }}><p className="caret">&lt;</p><p className="text">Back</p></div>
            <div className="createButton"><p className="text">Create</p><p className="plus">+</p></div>
          </div>
        </div>
      );
    }

  }
  return (
    <div className="App">
      <header className="App-header">
        Realm Render
      </header>
      {menuContents()}
      <div>
        <img className="custom-background" src={background} alt="background"></img>
      </div>
    </div>
  );
};

export default Home; 
