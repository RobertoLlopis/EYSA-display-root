import React from "react";
import styles from "./Row.module.scss";
function Row(props) {
  return <div className={styles.row}>{props.children}</div>;
}

export default Row;
