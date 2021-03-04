import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./Stars.module.scss";
function Stars({ valoration }) {
  const maxValoration = 5;
  const arrayOfStars = [];
  const [valorationState, setValorationState] = useState(valoration);
  const [starsColor, setStarsColors] = useState("blue");
  for (let i = 0; i < maxValoration; i++) {
    if (valorationState >= i + 1) {
      arrayOfStars.push(
        <StarFilled
          key={i}
          data-value={String(i + 1)}
          className={styles.icon + " " + styles[starsColor]}
          onClick={handleClick}
        />
      );
    } else {
      arrayOfStars.push(
        <StarOutlined
          key={i}
          data-value={String(i + 1)}
          className={styles.icon + " " + styles[starsColor]}
          onClick={handleClick}
        />
      );
    }
  }
  function handleClick(e) {
    const newValoration = e.target.closest("span").getAttribute("data-value");
    setStarsColors("orange");
    setValorationState(Number(newValoration));
  }
  return (
    <div className={styles.iconsDiv}>{arrayOfStars.map((star) => star)}</div>
  );
}

export default Stars;
