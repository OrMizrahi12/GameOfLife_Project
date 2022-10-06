import logo from './logo.svg';
import './App.css';
import GameOflife from './comps/gameOflife';

function App() {
  return (
    <div className="App">
      
      <nav className="navbar navbar">
        <span className=" h4 mx-auto main-title ">Game of Life</span>
      </nav>
      <br />

      <a
        className='link-css'
        target="_blank"
        href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
        What is Game of Life?
      </a>

      <br /> <br />
      <GameOflife />
    </div>
  );
}

export default App;
