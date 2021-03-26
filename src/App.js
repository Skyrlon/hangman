import React, { Component } from 'react'

import Hangman from './Hangman';
import WordToGuess from './WordToGuess';
import './App.css';

class App extends Component {

  state = {
    lettersPressed: ['a', 'n'],
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  }

  handleKeyDown = (e) => {
    const { lettersPressed, alphabet } = this.state
    let array = lettersPressed
    if (alphabet.includes(e.key) && !array.includes(e.key)) {
      array.push(e.key)
      this.setState({ lettersPressed: array })
      console.log(e.key)
      console.log(lettersPressed)
    }
  }


  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  render() {
    return (
      <div className="App" >
        <div className="App-header">
          <div className="hangman">
            <Hangman errorNumber={6} />
          </div>
        </div>
        <WordToGuess lettersProposed={this.state.lettersPressed} />
      </div>
    )
  }
}

export default App;
