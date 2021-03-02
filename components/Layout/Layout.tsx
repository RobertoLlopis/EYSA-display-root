import React from "react";
import Header from "../Header/Header";
import styles from "./Layout.module.scss";

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
