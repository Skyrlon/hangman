import Hangman from './Hangman';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="hangman">
          <Hangman errorNumber={4}/>
        </div>
      </header>
    </div>
  );
}

export default App;
