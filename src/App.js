import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'

import Hangman from './Hangman'
import WordToGuess from './WordToGuess'
import IncorrectLetters from './IncorrectLetters'
import Keyboard from './Keyboard'
import './App.css';

const randomWords = require('random-words')


class App extends Component {

  state = {
    wordToGuess: randomWords().toUpperCase(),
    wordFound: undefined,
    lettersPressed: [],
    correctLetters: [],
    incorrectLetters: [],
    errors: 0,
    winCounter: 0,
    alphabet: 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(''),
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
    const { correctLetters, incorrectLetters, winCounter } = this.state
    let won
    if (correctLetters.length === x.length) {
      won = true
      this.updateWinCounter(winCounter + 1)
    } else if (incorrectLetters.length >= 6) {
      won = false
      this.updateWinCounter(0)
    } else {
      won = undefined
    }
    this.setState({
      wordFound: won,
    })
  }

  updateWinCounter(value) {
    this.setState({ winCounter: value })
  }

  filterLetters(e) {
    const { lettersPressed, alphabet, wordFound } = this.state
    let array = lettersPressed
    if (alphabet.includes(e) && !array.includes(e) && wordFound === undefined) {
      array.push(e)
      this.updateState(array)
    }
  }

  handleKeyDown(e) {
    this.filterLetters(e.key.toUpperCase())
  }

  handleKeyboardEvent = (key) => {
    this.filterLetters(key)
  }

  resetGame = () => {
    this.setState({
      wordToGuess: randomWords().toUpperCase(),
      wordFound: undefined,
      lettersPressed: [],
      correctLetters: [],
      incorrectLetters: [],
      errors: 0,
    })
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
        <div className="win-counter">Chain Win : {this.state.winCounter}</div>
        {(this.state.wordFound === true || this.state.wordFound === false) && <div className="result">
          {(this.state.wordFound === true && <div>You Won<br />The word was {this.state.wordToGuess}</div>) || (this.state.wordFound === false && <div>Game Over<br /> The word was {this.state.wordToGuess}</div>)}
          <div onClick={this.resetGame}>Play again ? <br /><FontAwesomeIcon icon={faRedoAlt} /></div>
        </div>}
        <div className="hangman">
          <Hangman errorNumber={this.state.errors} />
        </div>
        <WordToGuess lettersOfWordToGuess={this.state.wordToGuess.split('')} lettersProposed={this.state.correctLetters} />
        <IncorrectLetters letters={this.state.incorrectLetters} />
        <Keyboard sendLetter={this.handleKeyboardEvent} lettersAlreadyProposed={this.state.lettersPressed} />
      </div>
    )
  }
}

export default App;
