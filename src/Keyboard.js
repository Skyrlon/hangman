const azerty = 'azertyuiopqsdfghjklmwxcvbn'.split('')
const qwerty = 'qwertyuiopasdfghjklzxcvbnm'.split('')
const abcdef = 'abcdefghijklmnopqrstuvwxyz'.split('')



const Keyboard = ({ sendLetter }) => {
    return (
        <div className='keyboard' >
            <div className="azerty">
                <div className="row one">
                    {azerty.slice(0, 11).map((letter, index) => <div onClick={() => sendLetter(letter)} key={index}>{letter}</div>)}
                </div>
                <div className="row two">
                    {azerty.slice(11, 20).map((letter, index) => <div onClick={() => sendLetter(letter)} key={index}>{letter}</div>)}
                </div>
                <div className="row three">
                    {azerty.slice(20).map((letter, index) => <div onClick={() => sendLetter(letter)} key={index}>{letter}</div>)}
                </div>
            </div>
            <div className="qwerty">
                <div className="row one">
                    {qwerty.slice(0, 10).map((letter, index) => <div onClick={() => sendLetter(letter)} key={index}>{letter}</div>)}
                </div>
                <div className="row two">
                    {qwerty.slice(10, 19).map((letter, index) => <div onClick={() => sendLetter(letter)} key={index}>{letter}</div>)}
                </div>
                <div className="row three">
                    {qwerty.slice(19).map((letter, index) => <div onClick={() => sendLetter(letter)} key={index}>{letter}</div>)}
                </div>
            </div>
            <div className="abcdef">
                <div className="row one">
                    {abcdef.slice(0, 11).map((letter, index) => <div onClick={() => sendLetter(letter)} key={index}>{letter}</div>)}
                </div>
                <div className="row two">
                    {abcdef.slice(11, 20).map((letter, index) => <div onClick={() => sendLetter(letter)} key={index}>{letter}</div>)}
                </div>
                <div className="row three">
                    {abcdef.slice(20).map((letter, index) => <div onClick={() => sendLetter(letter)} key={index}>{letter}</div>)}
                </div>
            </div>
        </div >
    )
}

export default Keyboard