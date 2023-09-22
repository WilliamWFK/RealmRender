// HOME PAGE index.js file
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../indexBackground.svg';
import data from '../data.json'

const Home = () => {
  const [menumode, setMenumode] = useState(0);
  const [sliderValue, setValue] = useState(5); // example setting\
  const [jsonData] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const toggleItemSelection = (index) => {
    // Toggle the selection for the clicked item
    if (selectedItem === index) {
      setSelectedItem(null); // Deselect if already selected
    } else {
      setSelectedItem(index); // Select the new item
    }
  };

  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Save Name</th>
            <th>Save Theme</th>
            <th>Selected</th>
          </tr>
        </thead>
        <tbody>
          {jsonData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.theme}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItem === index}
                  onChange={() => toggleItemSelection(index)}
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
      alert(`Index: ${selectedItem} Name: ${jsonData[selectedItem].name} Theme: ${jsonData[selectedItem].theme}`);

      navigate("/mapEditor", {state: {index: selectedItem, action: "load"}});
    } else {
      alert("Please select a save to load");
      return;
    }
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
            {/* Create a table that displays all the saves from data.json*/}
            {renderTable()}
            <div class="navButtons">
              <div class="backButton" onClick={() => { setMenumode(0) }}><p class="caret">&lt;</p><p class="text">Back</p></div>
              {/* load a map editor with the selectedItem index*/}
              <div class="createButton" onClick={handleLoad}><p class="text">Load</p><p class="plus">+</p></div>
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
