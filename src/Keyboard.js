import { Component } from "react"

const azerty = 'azertyuiopqsdfghjklmwxcvbn'.split('')
const qwerty = 'qwertyuiopasdfghjklzxcvbnm'.split('')
const abcdef = 'abcdefghijklmnopqrstuvwxyz'.split('')



class Keyboard extends Component {
    constructor(props) {
        super(props)
        this.state = { keyboardDesign: 'azerty' }
    }

    setKeyboardDesign = (e) => {
        this.setState({ keyboardDesign: e.target.textContent })
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
                    {this.state.keyboardDesign === 'azerty' && <div className="azerty">
                        <div className="row one">
                            {azerty.slice(0, 11).map((letter, index) => <div onClick={() => this.props.sendLetter(letter)} key={index}>{letter}</div>)}
                        </div>
                        <div className="row two">
                            {azerty.slice(11, 20).map((letter, index) => <div onClick={() => this.props.sendLetter(letter)} key={index}>{letter}</div>)}
                        </div>
                        <div className="row three">
                            {azerty.slice(20).map((letter, index) => <div onClick={() => this.props.sendLetter(letter)} key={index}>{letter}</div>)}
                        </div>
                    </div>}
                    {this.state.keyboardDesign === 'qwerty' && <div className="qwerty">
                        <div className="row one">
                            {qwerty.slice(0, 10).map((letter, index) => <div onClick={() => this.props.sendLetter(letter)} key={index}>{letter}</div>)}
                        </div>
                        <div className="row two">
                            {qwerty.slice(10, 19).map((letter, index) => <div onClick={() => this.props.sendLetter(letter)} key={index}>{letter}</div>)}
                        </div>
                        <div className="row three">
                            {qwerty.slice(19).map((letter, index) => <div onClick={() => this.props.sendLetter(letter)} key={index}>{letter}</div>)}
                        </div>
                    </div>}
                    {this.state.keyboardDesign === 'abcdef' && <div className="abcdef">
                        <div className="row one">
                            {abcdef.slice(0, 11).map((letter, index) => <div onClick={() => this.props.sendLetter(letter)} key={index}>{letter}</div>)}
                        </div>
                        <div className="row two">
                            {abcdef.slice(11, 20).map((letter, index) => <div onClick={() => this.props.sendLetter(letter)} key={index}>{letter}</div>)}
                        </div>
                        <div className="row three">
                            {abcdef.slice(20).map((letter, index) => <div onClick={() => this.props.sendLetter(letter)} key={index}>{letter}</div>)}
                        </div>
                    </div>}
                </div>
            </div >
        )
    }

}

export default Keyboard