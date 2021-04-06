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
    wordToGuess: '',
    wordFound: undefined,
    lettersPressed: [],
    correctLetters: [],
    incorrectLetters: [],
    errors: 0,
    winCounter: 0,
    alphabet: 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(''),
  }

  uniqueLettersOfWordToGuess() {
    let { wordToGuess } = this.state
    return [...new Set(wordToGuess)]
  }

  updateState = async (x) => {
    this.setState({
      lettersPressed: x,
      correctLetters: x.filter(letter => this.uniqueLettersOfWordToGuess().includes(letter)),
      incorrectLetters: x.filter(letter => !this.uniqueLettersOfWordToGuess().includes(letter)),
      errors: x.filter(letter => !this.uniqueLettersOfWordToGuess().includes(letter)).length
    })
    sessionStorage.setItem('lettersPressed', x)
    sessionStorage.setItem('correctLetters', x.filter(letter => this.uniqueLettersOfWordToGuess().includes(letter)))
    sessionStorage.setItem('incorrectLetters', x.filter(letter => !this.uniqueLettersOfWordToGuess().includes(letter)))
    await sessionStorage.setItem('errors', x.filter(letter => !this.uniqueLettersOfWordToGuess().includes(letter)).length)
    this.statusOfTheGame(this.uniqueLettersOfWordToGuess())
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
    sessionStorage.setItem('wordFound', won)
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

  resetGame = async () => {
    let word = randomWords().toUpperCase()
    sessionStorage.clear()
    await this.setState({
      wordToGuess: word,
      wordFound: undefined,
      lettersPressed: [],
      correctLetters: [],
      incorrectLetters: [],
      errors: 0,
    })
    sessionStorage.setItem('wordToGuess', word)
  }

  async loadState() {
    await this.setState({
      wordToGuess: sessionStorage.getItem('wordToGuess').length > 0 ? sessionStorage.getItem('wordToGuess') : randomWords().toUpperCase(),
      lettersPressed: sessionStorage.getItem('lettersPressed') ? sessionStorage.getItem('lettersPressed').split(',') : [],
      correctLetters: sessionStorage.getItem('correctLetters') ? sessionStorage.getItem('correctLetters').split(',') : [],
      incorrectLetters: sessionStorage.getItem('incorrectLetters') ? sessionStorage.getItem('incorrectLetters').split(',') : [],
      errors: sessionStorage.getItem('errors') > 0 ? parseInt(sessionStorage.getItem('errors')) : 0,
      wordFound: sessionStorage.getItem('wordFound') ? sessionStorage.getItem('wordFound') : undefined,
    })
    this.statusOfTheGame(this.uniqueLettersOfWordToGuess())
  }

  componentDidMount() {
    if (sessionStorage.length > 0) {
      this.loadState()
    } else {
      const word = randomWords().toUpperCase()
      this.setState({
        wordToGuess: word,
      })
      sessionStorage.setItem('wordToGuess', word)
    }
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
