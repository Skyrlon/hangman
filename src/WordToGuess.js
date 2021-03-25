const wordToGuess = 'Hangman';
const lettersOfWordToGuess = wordToGuess.split('');


const WordToGuess = () => {
    return (
        <div className="word-to-guess">
            {lettersOfWordToGuess.map((letter, index) => <div key={index}>{letter}</div>)}
        </div>
    )
}

export default WordToGuess;