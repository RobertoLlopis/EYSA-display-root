import Link from "next/link";
import React from "react";
import { Button } from "antd";
import styles from "./Header.module.scss";
function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/films">Films</Link>
          </li>
        </ul>
      </nav>
      <Button type="primary">Sign out</Button>
    </header>
  );
}

export default Header;
