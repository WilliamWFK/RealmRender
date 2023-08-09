import './styles/App.css';
import background from './RealmRenderWireframe1.drawio.svg';

function App() {
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
      <img src={background} alt="background"></img>
    </div>
  );
}

export default App;
