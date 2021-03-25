import React, { Component } from 'react'

import Hangman from './Hangman';
import WordToGuess from './WordToGuess';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App" >
        <div className="App-header">
          <div className="hangman">
            <Hangman errorNumber={6} />
          </div>
        </div>
        <WordToGuess />
      </div>
    )
  }
}

export default App;
