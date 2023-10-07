// HOME PAGE index.js file
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../indexBackground.svg';

const Home = () => {
  const [menumode, setMenumode] = useState(0);
  //const [sliderValue, setValue] = useState(5); // example setting

  const [formData, setFormData] = useState({name: "",width: 90,height: 90, players: 2, theme: "Atlantis"});

  const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
      event.preventDefault();
      alert(`Name: ${formData.name}, Email: ${formData.width}, Message: ${formData.height}, Players: ${formData.players}, Theme: ${formData.theme}`
      );

      navigate("/mapEditor", {state: {name: formData.name, width: formData.width, height: formData.height, players: formData.players, theme: formData.theme}});
  }

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
            <h1>Create Your Map</h1>
            <div class="settingForm">
              {/* example settings */}
              {/*<div>setting:</div>
              <input type="text" id="setting1" name="setting1"></input>
              <div>setting two:</div>
              <label for="setting2">{sliderValue}</label>
              <input type="range" min="0" max="10" value={sliderValue} onInput={(e) => setValue(e.target.value)} id="setting2" name="setting2"></input>
              */}
              {/* example settings end */}
              <form onSubmit={handleSubmit}>
                <div class = "formInput">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
                </div>
                {/* Create a dropdown to select theme*/}
                <div class = "formInput">
                  <label htmlFor="theme">Theme:</label>
                  <select id="theme" name="theme" value={formData.theme} onChange={handleChange}>
                    <option value="Atlantis">Atlantis</option>
                    <option value="Grasslands">Grasslands</option>
                    <option value="SciFi">SciFi</option>
                  </select>
                </div>

                <div class="formInput">
                  <label htmlFor="width">Width: {formData.width}</label>
                  <input type="range" min="90" max="90" step="3" defaultValue={formData.width} onChange={(e) =>setFormData({ ...formData, width: parseInt(e.target.value) })} id="width" name="width"></input>
                </div>
                <div class="formInput">
                  <label htmlFor="height">Height: {formData.height}</label>
                  <input type="range" min="90" max="90" step="3" defaultValue={formData.height} onChange={(e) =>setFormData({ ...formData, height: parseInt(e.target.value) })} id="height" name="height"></input>
                </div>
                {/* Create a slider to select 1-6 players*/}
                <div class="formInput">
                  <label htmlFor="players">Players: {formData.players}</label>
                  <input type="range" min="1" max="6" defaultValue={formData.players} onChange={(e) =>setFormData({ ...formData, players: parseInt(e.target.value) })} id="players" name="players"></input>
                </div>



                <div class="navButtons">
                  <div class="backButton" onClick={() => { setMenumode(0) }}><p class="caret">&lt;</p><p class="text">Back</p></div>
                  <button type="submit" class="createButton"><p class="text">Create</p><p class="plus">+</p></button>
                </div>
              </form>
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
