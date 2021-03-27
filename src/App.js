import React, { Component } from 'react'

import Hangman from './Hangman'
import WordToGuess from './WordToGuess'
import IncorrectLetters from './IncorrectLetters'
import './App.css';

class App extends Component {

  state = {
    wordToGuess: 'hangman',
    lettersPressed: [],
    correctLetters: [],
    incorrectLetters: [],
    errors: 0,
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  }

  updateState = (x) => {
    const { wordToGuess } = this.state
    this.setState({
      lettersPressed: x,
      correctLetters: x.filter(letter => wordToGuess.split('').includes(letter)),
      incorrectLetters: x.filter(letter => !wordToGuess.split('').includes(letter)),
      errors: x.filter(letter => !wordToGuess.split('').includes(letter)).length
    })
  }

  handleKeyDown = (e) => {
    const { lettersPressed, alphabet } = this.state
    let array = lettersPressed
    if (alphabet.includes(e.key) && !array.includes(e.key)) {
      array.push(e.key)
      this.updateState(array)
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      this.handleKeyDown(e)
    })
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  render() {
    return (
      <div className="App" >
        <div className="App-header">
          <div className="hangman">
            <Hangman errorNumber={this.state.errors} />
          </div>
        </div>
        <WordToGuess lettersOfWordToGuess={this.state.wordToGuess.split('')} lettersProposed={this.state.correctLetters} />
        <IncorrectLetters letters={this.state.incorrectLetters} />
      </div>
    )
  }
}

export default App;
