const azerty = 'azertyuiopqsdfghjklmwxcvbn'.split('')
const qwerty = 'qwertyuiopasdfghjklzxcvbnm'.split('')



const Keyboard = ({ sendLetter }) => {
    return (
        <div className='keyboard' >
            <div className="azerty">
                {azerty.map((letter, index) => <div onClick={() => sendLetter(letter)} key={index}>{letter}</div>)}
            </div>
            <div className="qwerty">
                {qwerty.map((letter, index) => <div onClick={() => sendLetter(letter)} key={index}>{letter}</div>)}
            </div>
        </div >
    )
}

export default Keyboard