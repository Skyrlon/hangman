import React, { Component } from 'react'

import Hangman from './Hangman';
import WordToGuess from './WordToGuess';
import './App.css';

class App extends Component {

  state = {
    lettersPressed: [],
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  }

  getLettersPressed = () => {
    const { lettersPressed } = this.state
    return lettersPressed
  }

  handleKeyDown = (e) => {
    const { lettersPressed, alphabet } = this.state
    let array = lettersPressed
    if (alphabet.includes(e.key) && !array.includes(e.key)) {
      array.push(e.key)
      this.setState({ lettersPressed: array })
      this.getLettersPressed()
    }
  }


  componentDidMount() {
    this.getLettersPressed()
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
        <WordToGuess lettersProposed={this.getLettersPressed()} />
      </div>
    )
  }
}

export default App;
