// HOME PAGE index.js file
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../indexBackground.svg';


const Home = () => {

  // Form data
  const [menumode, setMenumode] = useState(0);
  const [formData, setFormData] = useState({ name: "", width: 90, height: 90, players: 2, theme: "Atlantis" });

  const [jsonData] = useState(localStorage.getItem("maps") ? JSON.parse(localStorage.getItem("maps")) : []);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleItemSelection = (index) => {
    // Toggle the selection for the clicked item
    if (selectedItem === index) {
      setSelectedItem(null); // Deselect if already selected
    } else {
      setSelectedItem(index); // Select the new item
    }
  };
  const renderTable = () => {
    const reversedData = jsonData.slice().reverse();
    return (
      <table id="load_table">
        <thead>
          <tr>
            <th>Save Name</th>
            <th>Save Theme</th>
            <th>Selected</th>
          </tr>
        </thead>
        <tbody>
          {reversedData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.theme}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItem === jsonData.length - 1 - index}
                  onChange={() => toggleItemSelection(jsonData.length - 1 - index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


  const handleLoad = (event) => {
    event.preventDefault();
    if (selectedItem !== null && selectedItem >= 0 && selectedItem < jsonData.length) {
      navigate("/mapEditor", {state: {index: selectedItem, action: "load"}});
    } else {
      alert("Please select a save to load");
      return;
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/mapEditor", { state: { name: formData.name, width: formData.width, height: formData.height, players: formData.players, theme: formData.theme } });
  }

  // Main menu buttons
  function mainMenuButtons() {
    return (
      <div class="menuBackdrop mainMenu">
          <div onClick={() => { setMenumode(1) }} class="menuButtonItem"><p>New</p></div>
          <div onClick={() => { setMenumode(2) }} class="menuButtonItem"><p>Load</p></div>
          <div onClick={() => { setMenumode(3) }} class="menuButtonItem"><p>Join</p></div>
        </div>
    )
  }

  // Menu buttons
  function menuContents() {
    // Default menu
    if (menumode === 0) {
      return (
        mainMenuButtons()
      );

    // Create map menu
    } else if (menumode === 1) {
      return (
        <div>
          <div class="auxMenuBackdrop createForm">
            <h1>Create Your Map</h1>
            <div class="settingForm">
              <form onSubmit={handleSubmit}>
                <div class="formInput">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                {/* Create a dropdown to select theme */}
                <div class="formInput">
                  <label htmlFor="theme">Theme:</label>
                  <select id="theme" name="theme" value={formData.theme} onChange={handleChange}>
                    <option value="Atlantis">Atlantis</option>
                    <option value="Grasslands">Grasslands</option>
                    <option value="SciFi">SciFi</option>
                  </select>
                </div>
                <div class="formInput">
                  <label htmlFor="width">Width: {formData.width}</label>
                  <input type="range" min="30" max="120" step="1" defaultValue={formData.width} onChange={(e) => setFormData({ ...formData, width: parseInt(e.target.value) })} id="width" name="width"></input>
                </div>
                <div class="formInput">
                  <label htmlFor="height">Height: {formData.height}</label>
                  <input type="range" min="30" max="120" step="1" defaultValue={formData.height} onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })} id="height" name="height"></input>
                </div>
                {/* Create a slider to select 1-6 players */}
                <div class="formInput">
                  <label htmlFor="players">Players: {formData.players}</label>
                  <input type="range" min="1" max="6" defaultValue={formData.players} onChange={(e) => setFormData({ ...formData, players: parseInt(e.target.value) })} id="players" name="players"></input>
                </div>
                <div class="navButtons">
                  <div class="backButton" onClick={() => { setMenumode(0) }}><p class="caret">&lt;</p><p class="text">Back</p></div>
                  <button type="submit" class="createButton"><p class="text">Create</p><p class="plus">+</p></button>
                </div>
              </form>
            </div>
          </div>
          {mainMenuButtons()}
        </div>
      );

    // Load menu
    } else if (menumode === 2) {
      return (
        <div>
          {mainMenuButtons()}
          <div class="auxMenuBackdrop loadForm">
            <h1>Load</h1>
            {renderTable()}
            <div class="navButtons">
              <div class="backButton" onClick={() => { setMenumode(0) }}><p class="caret">&lt;</p><p class="text">Back</p></div>
              <div class="createButton" onClick={handleLoad}><p class="text">Load</p><p class="plus">+</p></div>
            </div>
          </div>
        </div>
      );
    } else if (menumode === 3) {
      return (
        <div>
          {mainMenuButtons()}
          <div class="auxMenuBackdrop joinForm">
            <h1>Join</h1>
            <textarea id="pasteBox" name="pasteBox" rows="1"></textarea>
            <div class="navButtons">
              <div class="backButton" onClick={() => { setMenumode(0) }}><p class="caret">&lt;</p><p class="text">Back</p></div>
              {/* <div class="createButton" ><p class="text">Join</p></div> */}
              <Link to="/playerView" class="createButton"><p class="textJoin">Join</p></Link>
            </div>
          </div>
        </div>
      );
    } else if (menumode === 3) {
      return (
        <div>
          {mainMenuButtons()}
          <div class="auxMenuBackdrop joinForm">
            <h1>Join</h1>
            <textarea id="pasteBox" name="pasteBox" rows="1"></textarea>
            <div class="navButtons">
              <div class="backButton" onClick={() => { setMenumode(0) }}><p class="caret">&lt;</p><p class="text">Back</p></div>
              {/* <div class="createButton" ><p class="text">Join</p></div> */}
              <Link to="/playerView" class="createButton"><p class="textJoin">Join</p></Link>
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
