import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "antd";
import styles from "./Header.module.scss";

import { ROUTES } from "../../utils/routes";
import { useAuthContext } from "context/AuthContext";
import Toggle from "./Toggle/Toggle";

function Header() {
  const router = useRouter();
  const { setUser } = useAuthContext();
  function isActive(linkRoute) {
    return router.pathname === linkRoute ? styles.active : "";
  }
  function handleClick(_e) {
    setUser(null);
    localStorage.removeItem("user");
    router.push(ROUTES.LOGIN);
  }
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href={ROUTES.HOME}>
              <a className={isActive(ROUTES.HOME)}>Home</a>
            </Link>
          </li>
          <li className={isActive(ROUTES.FILMS)}>
            <Link href={ROUTES.FILMS}>
              <a className={isActive(ROUTES.FILMS)}>Films</a>
            </Link>
          </li>
        </ul>
      </nav>
      <Toggle />
      <Button type="primary" onClick={handleClick}>
        Sign out
      </Button>
    </header>
  );
}

export default Header;
