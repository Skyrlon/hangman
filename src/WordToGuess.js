const wordToGuess = 'Hangman';
const lettersOfWordToGuess = wordToGuess.split('');

const WordToGuess = ({ lettersProposed }) => (
    <div className="word-to-guess">
        {lettersOfWordToGuess.map((letter, index) => lettersProposed.includes(letter) ? <div key={index}>{letter}</div> : <div key={index}>{'_'}</div>)}
    </div>
)



export default WordToGuess;