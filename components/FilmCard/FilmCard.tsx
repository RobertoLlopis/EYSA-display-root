import { Card } from "antd";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/routes";
import styles from "./FilmCard.module.scss";
function FilmCard({ film }) {
  const router = useRouter();
  const { id, title, image, director } = film;
  const handleClick = (_e) => {
    router.push({
      pathname: ROUTES.FILM_DETAIL,
      query: { id },
    });
  };
  return (
    <Card
      role="filmCard"
      hoverable
      className={styles.card}
      cover={<img alt={`${title} film picture`} src={image} />}
      onClick={handleClick}
    >
      <div>
        <h2>{title}</h2>
        <h5>{director}</h5>
      </div>
    </Card>
  );
}

export default FilmCard;
