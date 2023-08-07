import logo from './logo.svg';
import './styles/App.css';
import background from './RealmRenderWireframe1.drawio.svg';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <header className="App-header">
        Realm Render
      </header>
      <div className="menuButtons">
        <a href="#" className="menuButtonItem"><p>New</p></a>
        <a href="#" className="menuButtonItem"><p>Load</p></a>
        <a href="#" className="menuButtonItem"><p>Join</p></a>
      </div>
      <img src={background}></img>
    </div>
  );
}

export default App;
