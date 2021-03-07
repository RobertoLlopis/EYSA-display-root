import { useRouter } from "next/router";
import { useEffect } from "react";
import { initializeApollo } from "../../apollo/apollo";
import { useAuthContext } from "../../context/AuthContext";
import { queryDeclarations } from "../../utils/queryDeclarations";
import { ROUTES } from "../../utils/routes";
import Layout from "../../components/Layout/Layout";
import Stars from "../../components/Stars/Stars";
import styles from "./Film.module.scss";
import Comments from "../../components/Comments/Comments";
function film({ film }) {
  const router = useRouter();
  const { user } = useAuthContext();
  useEffect(() => {
    !user && router.push(ROUTES.LOGIN);
  }, []);
  return (
    <Layout>
      <section className={styles.infoSection}>
        <img className={styles.img} alt="film picture" src={film.image}></img>
        <div className={styles.detailsDiv}>
          <div>
            <h4>Film Name:</h4>
            <h2>{film.title}</h2>
          </div>
          <div>
            <h4>Director:</h4>
            <h2>{film.director}</h2>
          </div>
          <div>
            <h4>Year:</h4>
            <h2>{film.productionYear}</h2>
          </div>
          <Stars valoration={film.valoration} />
        </div>
      </section>
      <Comments comments={film.comments} filmId={film.id} />
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const apolloClient = initializeApollo();
  const response = await apolloClient.query({
    query: queryDeclarations.GET_SINGLE_FULL_FILM,
    variables: { id },
  });

  const initialApolloState = apolloClient.cache.extract();
  const { getFilm: film } = response.data;
  return {
    props: {
      initialApolloState,
      film,
    },
  };
}

export default film;
