import React, { Component } from 'react'

import Hangman from './Hangman'
import WordToGuess from './WordToGuess'
import IncorrectLetters from './IncorrectLetters'
import Keyboard from './Keyboard'
import './App.css';

class App extends Component {

  state = {
    wordToGuess: 'hangman',
    wordFound: undefined,
    lettersPressed: [],
    correctLetters: [],
    incorrectLetters: [],
    errors: 0,
    alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  }

  updateState = async (x) => {
    const { wordToGuess } = this.state
    const uniqueLettersOfWordToGuess = [...new Set(wordToGuess)]
    await this.setState({
      lettersPressed: x,
      correctLetters: x.filter(letter => uniqueLettersOfWordToGuess.includes(letter)),
      incorrectLetters: x.filter(letter => !uniqueLettersOfWordToGuess.includes(letter)),
      errors: x.filter(letter => !uniqueLettersOfWordToGuess.includes(letter)).length
    })
    this.statusOfTheGame(uniqueLettersOfWordToGuess)
  }

  statusOfTheGame = (x) => {
    const { correctLetters, incorrectLetters } = this.state
    let won
    if (correctLetters.length === x.length) {
      won = true
    } else if (incorrectLetters.length >= 6) {
      won = false
    } else {
      won = undefined
    }
    this.setState({
      wordFound: won,
    })
  }

  filterLetters(e) {
    const { lettersPressed, alphabet, wordFound } = this.state
    let array = lettersPressed
    if (alphabet.includes(e) && !array.includes(e) && wordFound === undefined) {
      array.push(e)
      this.updateState(array)
    }
  }

  handleKeyDown = (e) => {
    this.filterLetters(e.key)
  }

  handleKeyboardEvent = (key) => {
    this.filterLetters(key)
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
        <Keyboard sendLetter={this.handleKeyboardEvent} lettersAlreadyProposed={this.state.lettersPressed} />
      </div>
    )
  }
}

export default App;
