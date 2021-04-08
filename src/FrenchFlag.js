const FrenchFlag = ({ active }) => {
    return (
        <svg version="1.1" viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
            <rect fill="#002395" x="0" y="0" width="300" height="500" />
            <rect fill="#ffffff" x="300" y="0" width="300" height="500" />
            <rect fill="#ed2939" x="600" y="0" width="300" height="500" />
            {!active && <rect x="0" y="0" width="900" height="500" fill="white" fillOpacity="0.7" />}
        </svg>
    )
}

export default FrenchFlag