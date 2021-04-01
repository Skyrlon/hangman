import { Component } from "react"

const azerty = 'azertyuiopqsdfghjklmwxcvbn'.toUpperCase().split('')
const qwerty = 'qwertyuiopasdfghjklzxcvbnm'.toUpperCase().split('')
const abcdef = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')



class Keyboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyboardDesign: 'azerty',
            keyboards: [
                { name: azerty.slice(0, 6).join('').toLowerCase(), letters: azerty, secondRowStart: 11, thirdRowStart: 20 },
                { name: qwerty.slice(0, 6).join('').toLowerCase(), letters: qwerty, secondRowStart: 10, thirdRowStart: 19 },
                { name: abcdef.slice(0, 6).join('').toLowerCase(), letters: abcdef, secondRowStart: 11, thirdRowStart: 20 }]
        }
    }

    setKeyboardDesign = (e) => {
        this.setState({
            keyboardDesign: e.target.textContent.toLowerCase(),
        })
    }
    render() {
        return (
            <div className='keyboard-container' >
                <div className="keyboard-design">
                    <div className="keyboard-design_azerty" onClick={this.setKeyboardDesign}>{azerty.slice(0, 6).join('')}</div>
                    <div className="keyboard-design_qwerty" onClick={this.setKeyboardDesign}>{qwerty.slice(0, 6).join('')}</div>
                    <div className="keyboard-design_abcdef" onClick={this.setKeyboardDesign}>{abcdef.slice(0, 6).join('')}</div>
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