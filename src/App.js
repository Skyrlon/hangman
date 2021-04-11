import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'

import Hangman from './Hangman'
import WordToGuess from './WordToGuess'
import IncorrectLetters from './IncorrectLetters'
import Keyboard from './Keyboard'
import './App.css';
import EnglishFlag from './EnglishFlag.js'
import FrenchFlag from './FrenchFlag.js'


const randomWords = require('random-words')

const words = require('an-array-of-french-words')

const randomWordsFR = function getRandomFrenchWord() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const randomIndex = Math.ceil(Math.random() * words.length)
  const randomFrenchWord = words[randomIndex]
  if (randomFrenchWord.split('').every(element => alphabet.includes(element)) && randomFrenchWord.length > 2) {
    return randomFrenchWord
  }
  else {
    return getRandomFrenchWord()
  }
}


class App extends Component {

  state = {
    language: 'en',
    wordToGuess: '',
    wordFound: undefined,
    lettersPressed: [],
    correctLetters: [],
    incorrectLetters: [],
    errors: 0,
    winCounter: 0,
    winRecord: 0,
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
    sessionStorage.setItem('winCounter', value)
  }

  updateWinRecord(value) {
    this.setState({ winRecord: value })
    localStorage.setItem('winRecord', value)
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

  async changeLanguage(x) {
    this.setState({ language: x })
    await localStorage.setItem('language', x)
    this.resetGame()
  }

  resetGame = async () => {
    let word = randomWords().toUpperCase()
    sessionStorage.setItem('lettersPressed', '')
    sessionStorage.setItem('correctLetters', '')
    sessionStorage.setItem('incorrectLetters', '')
    sessionStorage.setItem('errors', '')
    await this.setState({
      wordToGuess: word,
      wordFound: undefined,
      lettersPressed: [],
      correctLetters: [],
      incorrectLetters: [],
      errors: 0,
      winCounter: parseInt(sessionStorage.getItem('winCounter'))
    })
    await sessionStorage.setItem('wordToGuess', word)
    if (this.state.winCounter > this.state.winRecord) {
      this.updateWinRecord(this.state.winCounter)
    }
  }

  async loadState() {
    await this.setState({
      wordToGuess: sessionStorage.getItem('wordToGuess').length > 0 ? sessionStorage.getItem('wordToGuess') : randomWords().toUpperCase(),
      lettersPressed: sessionStorage.getItem('lettersPressed') ? sessionStorage.getItem('lettersPressed').split(',') : [],
      correctLetters: sessionStorage.getItem('correctLetters') ? sessionStorage.getItem('correctLetters').split(',') : [],
      incorrectLetters: sessionStorage.getItem('incorrectLetters') ? sessionStorage.getItem('incorrectLetters').split(',') : [],
      errors: parseInt(sessionStorage.getItem('errors')) > 0 ? parseInt(sessionStorage.getItem('errors')) : 0,
      wordFound: sessionStorage.getItem('wordFound') ? sessionStorage.getItem('wordFound') : undefined,
    })
    this.statusOfTheGame(this.uniqueLettersOfWordToGuess())
    await this.updateWinCounter(parseInt(sessionStorage.getItem('winCounter')) > 0 ? parseInt(sessionStorage.getItem('winCounter')) : 0)
  }

  componentDidMount() {
    console.log(randomWordsFR())
    this.setState({
      winRecord: parseInt(localStorage.getItem('winRecord')) > 0 ? parseInt(localStorage.getItem('winRecord')) : 0,
      language: 'language' in localStorage ? localStorage.getItem('language') : 'en'
    })
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
        <div className="flags">
          <div className="flags_en" onClick={() => { this.changeLanguage('en') }}>
            <EnglishFlag active={this.state.language === 'en'} />
          </div>
          <div className="flags_fr" onClick={() => { this.changeLanguage('fr') }}>
            <FrenchFlag active={this.state.language === 'fr'} />
          </div>
        </div>
        <div className="win-record">Record : {this.state.winRecord}</div>
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
