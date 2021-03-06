import { useThemeContext } from "context/ThemeContext";
import { useState } from "react";
import styles from "./Toggle.module.scss";
function Toggle() {
  const { theme, toggleTheme } = useThemeContext();
  const handleClick = (_e) => toggleTheme();
  const [checked, setChecked] = useState(theme === "light" ? true : false);
  const capitalize = (str) => {
    const letter = str.substr(0, 1);
    const string = str.toLowerCase();
    return letter.toUpperCase() + string.substr(1);
  };

  return (
    <div className={styles.container}>
      <h4>{capitalize(theme)}</h4>
      <label className={styles.switchWrap}>
        <input
          type="checkbox"
          onClick={handleClick}
          defaultChecked={theme === "light" ? false : true}
        />
        <div className={styles.switch}></div>
      </label>
    </div>
  );
}

export default Toggle;
