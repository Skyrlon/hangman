const IncorrectLetters = ({ letters }) => (
    <div className="incorrect-letters">
        {letters.map((letter, index) => <div key={index}>{letter}</div>)}
    </div>
)

export default IncorrectLetters;