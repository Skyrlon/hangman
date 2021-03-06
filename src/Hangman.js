const Hangman = ({ errorNumber }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <rect x="10" y="90" rx="3" width="85" height="7" /> {/* bottom bar */}
            <rect x="80" y="10" width="7" height="80" /> {/* right bar */}
            <rect x="7" y="5" rx="3" width="80" height="7" /> {/* top bar */}
            <rect x="30" y="12" width="3" height="10" /> {/* rope */}
            <rect x="70" y="12.5" width="15" height="4" transform="rotate(45 77.5 14.5)" />
            {errorNumber > 0 && (<circle cx="31.5" cy="28.5" r="5" fill="transparent" stroke="black" strokeWidth="3" />)} {/* head */}
            {errorNumber > 1 && (<rect x="30" y="35" width="3" height="17.5" />)} {/* body */}
            {errorNumber > 2 && (<rect x="30" y="37" width="3" height="15" rx="2" transform="rotate(30 31.5 37)" />)} {/* left arm */}
            {errorNumber > 3 && (<rect x="30" y="37" width="3" height="15" rx="2" transform="rotate(-30 31.5 37)" />)} {/* right arm */}
            {errorNumber > 4 && (<rect x="30" y="52" width="3" height="15" rx="2" transform="rotate(20 31.5 52)" />)} {/* left leg */}
            {errorNumber > 5 && (<rect x="30" y="52" width="3" height="15" rx="2" transform="rotate(-20 31.5 52)" />)} {/* right leg */}
        </svg>
    )
}

Hangman.defaultProps = {
    errorNumber: 0,
}

export default Hangman;