import "./DarkThemeToggle.css";

const DarkThemeToggle = ({ on, toggleDarkTheme }) => {
  return (
    <div onClick={toggleDarkTheme}>
      <svg
        className={`toggle ${on ? "on" : ""}`}
        viewBox="0 0 50 30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          className="switch"
          y2="15"
          x2="35"
          y1="15"
          x1="15"
          strokeWidth="30"
          strokeLinecap="var(--linecap)"
        />
        <line
          className="knob"
          y2="15"
          x2="15"
          y1="15"
          x1="15"
          strokeWidth="20"
          strokeLinecap="var(--linecap)"
        />
      </svg>
    </div>
  );
};

export default DarkThemeToggle;
