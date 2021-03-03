import { useRouter } from "next/router";
import { ROUTES } from "utils/routes";
import styles from "./FilmSnap.module.scss";

function FilmSnap({ film }) {
  const { id, image, title, director, productionYear } = film;
  const router = useRouter();
  const handleClick = (_e) => {
    router.push({
      pathname: ROUTES.FILM_DETAIL,
      query: { id },
    });
  };
  return (
    <>
      <div className={styles.picWrapper} onClick={handleClick}>
        <img
          src={image}
          className={styles.coverPicture}
          alt={`${title} film picture`}
        />
      </div>
      <div className={styles.infoWrapper} onClick={handleClick}>
        <div className={styles.titleDirector}>
          <h2>{title}</h2>
          <h5>{director}</h5>
        </div>
        <p className={styles.year}>{`Year ${productionYear}`}</p>
      </div>
    </>
  );
}

export default FilmSnap;
