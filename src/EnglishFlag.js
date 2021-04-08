const EnglishFlag = ({ active }) => {
    return (
        <svg version="1.1" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
            <rect fill="#04287B" x="0" y="0" width="800" height="500" />
            <polygon fill="white" points="0,0 100,0 800,440 800,500 700,500 0,50" />
            <polygon fill="white" points="60,500 0,500 0,420 700,0 800,0 800,50" />
            <polygon fill="#CD1931" points="0,0 250,160 200,160 0,35" />
            <polygon fill="#CD1931" points="800,0 540,160 490,160 740,0" />
            <polygon fill="#CD1931" points="0,500 250,340 300,340 40,500" />
            <polygon fill="#CD1931" points="800,500 540,340 610,340 800,460" />
            <rect fill="white" x="315" y="0" width="180" height="500" />
            <rect fill="white" x="0" y="160" width="800" height="180" />
            <rect fill="#CD1931" x="355" y="0" width="100" height="500" />
            <rect fill="#CD1931" x="0" y="200" width="800" height="100" />
            {!active && <rect x="0" y="0" width="800" height="500" fill="white" fillOpacity="0.7" />}
        </svg>
    )
}

export default EnglishFlag