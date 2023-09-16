// HOME PAGE index.js file
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import background from '../indexBackground.svg';

const Home = () => {
  const [menumode, setMenumode] = useState(0);
  const [sliderValue, setValue] = useState(5); // example setting

  function menuContents() {
    if (menumode === 0) {
      return (
        <div class="menuBackdrop mainMenu">
          <div onClick={() => { setMenumode(1) }} class="menuButtonItem"><p>New</p></div>
          <div onClick={() => { setMenumode(2) }} class="menuButtonItem"><p>Load</p></div>
          <Link to="/join" class="menuButtonItem"><p>Join</p></Link>
        </div>
      );
    } else if (menumode === 1) {
      return (
        <div>
          <div class="menuBackdrop createForm">
            <h1>Options</h1>
            <div class="settingForm">
              {/* example settings */}
              <div>setting:</div>
              <input type="text" id="setting1" name="setting1"></input>
              <div>setting two:</div>
              <label for="setting2">{sliderValue}</label>
              <input type="range" min="0" max="10" value={sliderValue} onInput={(e) => setValue(e.target.value)} id="setting2" name="setting2"></input>
              {/* example settings end */}
            </div>
            <div class="navButtons">
              <div class="backButton" onClick={() => { setMenumode(0) }}><p class="caret">&lt;</p><p class="text">Back</p></div>
              <Link to="/mapEditor" class="linkitem"><div class="createButton"><p class="text">Create</p><p class="plus">+</p></div></Link>
            </div>
          </div>
          <div class="menuBackdrop mainMenu">
            <div onClick={() => { setMenumode(1) }} class="menuButtonItem"><p>New</p></div>
            <div onClick={() => { setMenumode(2) }} class="menuButtonItem"><p>Load</p></div>
            <Link to="/join" class="menuButtonItem"><p>Join</p></Link>
          </div>
        </div>
      );
    } else if (menumode === 2) {
      return (
        <div>
          <div class="menuBackdrop mainMenu">
            <div onClick={() => { setMenumode(1) }} class="menuButtonItem"><p>New</p></div>
            <div onClick={() => { setMenumode(2) }} class="menuButtonItem"><p>Load</p></div>
            <Link to="/join" class="menuButtonItem"><p>Join</p></Link>
          </div>
          <div class="menuBackdrop loadForm">
            <h1>Load</h1>
            <textarea id="pasteBox" name="pasteBox" rows="4"></textarea>
            <div class="navButtons">
              <div class="backButton" onClick={() => { setMenumode(0) }}><p class="caret">&lt;</p><p class="text">Back</p></div>
              <div class="createButton" ><p class="text">Load</p><p class="plus">+</p></div>
            </div>
          </div>
        </div>
      );
    }

  }
  return (
    <div class="App">
      <header class="App-header">
        Realm Render
      </header>
      {menuContents()}
      <div>
        <img class="custom-background" src={background} alt="background"></img>
      </div>
    </div>
  );
};

export default Home;
