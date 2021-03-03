import React from "react";
import styles from "./FilmSnap.module.scss";

function FilmSnap({ film }) {
  const { image, title, director, productionYear } = film;
  console.log(film);
  return (
    <>
      <div className={styles.picWrapper}>
        <img
          src={image}
          className={styles.coverPicture}
          alt={`${title} film picture`}
        />
      </div>
      <div className={styles.infoWrapper}>
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
