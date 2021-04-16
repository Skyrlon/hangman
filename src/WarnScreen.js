import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'

const WarnScreen = ({ wordFound, warnWinReset, word, playAgain, acceptSwitchLanguage, cancelSwitchLanguage }) => {
    return (
        <div className="warn-screen-container">
            {(wordFound === true || wordFound === false || warnWinReset === true) && <div className="warn-screen">
                {(wordFound === true || wordFound === false) && <div className="game-result">
                    <div>
                        {(wordFound === true && <div>You Won</div>) || (wordFound === false && <div>Game Over</div>)}
                        <div>The word was {word}</div>
                    </div>
                    <div onClick={playAgain}>Play again ? <br /><FontAwesomeIcon icon={faRedoAlt} /></div>
                </div>}
                {warnWinReset === true && <div className="warn-chain-win-reset">
                    <div>Your chain win will reset if you switch language now !</div>
                    <div className="warn-chain-win-reset_choices">
                        <div onClick={acceptSwitchLanguage}>Switch Language anyway</div>
                        <div onClick={cancelSwitchLanguage}>Cancel</div>
                    </div>
                </div>}
            </div>}
        </div>
    )
}

export default WarnScreen;