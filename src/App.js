import React, { Component } from 'react'

import Hangman from './Hangman'
import WordToGuess from './WordToGuess'
import IncorrectLetters from './IncorrectLetters'
import './App.css';

class App extends Component {

  state = {
    wordToGuess: 'hangman',
    wordFound: undefined,
    lettersPressed: [],
    correctLetters: [],
    incorrectLetters: [],
    errors: 0,
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  }

  updateState = (x) => {
    const { wordToGuess } = this.state
    const uniqueLettersOfWordToGuess = [...new Set(wordToGuess)]
    this.setState({
      lettersPressed: x,
      correctLetters: x.filter(letter => uniqueLettersOfWordToGuess.includes(letter)),
      incorrectLetters: x.filter(letter => !uniqueLettersOfWordToGuess.includes(letter)),
      errors: x.filter(letter => !uniqueLettersOfWordToGuess.includes(letter)).length
    })
    this.statusOfTheGame(uniqueLettersOfWordToGuess)
  }

  statusOfTheGame = (x) => {
    const { correctLetters, incorrectLetters } = this.state
    let win
    if (correctLetters.length === x.length) {
      win = true
    } else if (incorrectLetters.length >= 6) {
      win = false
    } else {
      win = undefined
    }
    this.setState({
      wordFound: win,
    })
  }

  handleKeyDown = (e) => {
    const { lettersPressed, alphabet, wordFound } = this.state
    let array = lettersPressed
    if (alphabet.includes(e.key) && !array.includes(e.key) && wordFound === undefined) {
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
          <div className="result">
            {(this.state.wordFound === true && <div>WIN</div>) || (this.state.wordFound === false && <div>LOOSE</div>)}
          </div>
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
