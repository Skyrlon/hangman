import { Component } from "react"

const azerty = 'azertyuiopqsdfghjklmwxcvbn'.split('')
const qwerty = 'qwertyuiopasdfghjklzxcvbnm'.split('')
const abcdef = 'abcdefghijklmnopqrstuvwxyz'.split('')



class Keyboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyboardDesign: 'azerty',
            keyboards: [
                { name: 'azerty', letters: azerty, secondRowStart: 11, thirdRowStart: 20 },
                { name: 'qwerty', letters: qwerty, secondRowStart: 10, thirdRowStart: 19 },
                { name: 'abcdef', letters: abcdef, secondRowStart: 11, thirdRowStart: 20 }]
        }
    }

    setKeyboardDesign = (e) => {
        this.setState({
            keyboardDesign: e.target.textContent,
        })
    }
    render() {
        return (
            <div className='keyboard-container' >
                <div className="keyboard-design">
                    <div className="keyboard-design_azerty" onClick={this.setKeyboardDesign}>azerty</div>
                    <div className="keyboard-design_qwerty" onClick={this.setKeyboardDesign}>qwerty</div>
                    <div className="keyboard-design_abcdef" onClick={this.setKeyboardDesign}>abcdef</div>
                </div>
                <div className="keyboard">
                    {this.state.keyboards.map((keyboard) =>
                        this.state.keyboardDesign === keyboard.name && <div key={keyboard.name} className={keyboard.name}>
                            <div className="row one">
                                {keyboard.letters.slice(0, keyboard.secondRowStart).map((letter, index) => this.props.lettersAlreadyProposed.includes(letter) ? <div className="already-proposed" key={index}>{letter}</div> : <div onClick={() => this.props.sendLetter(letter)} key={index}>{letter}</div>)}
                            </div>
                            <div className="row two">
                                {keyboard.letters.slice(keyboard.secondRowStart, keyboard.thirdRowStart).map((letter, index) => this.props.lettersAlreadyProposed.includes(letter) ? <div className="already-proposed" key={index}>{letter}</div> : <div onClick={() => this.props.sendLetter(letter)} key={index}>{letter}</div>)}
                            </div>
                            <div className="row three">
                                {keyboard.letters.slice(keyboard.thirdRowStart).map((letter, index) => this.props.lettersAlreadyProposed.includes(letter) ? <div className="already-proposed" key={index}>{letter}</div> : <div onClick={() => this.props.sendLetter(letter)} key={index}>{letter}</div>)}
                            </div>
                        </div>
                    )}
                </div>
            </div >
        )
    }

}

export default Keyboard