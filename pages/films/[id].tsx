import Layout from "components/Layout/Layout";
import { initializeApollo } from "src/apollo";
import { queryDeclarations } from "utils/queryDeclarations";
import styles from "./Film.module.scss";
import Stars from "components/Stars/Stars";
function film({ film }) {
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
          <Stars valoration={film.valoration} />
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const queryResult = await apolloClient.query({
    query: queryDeclarations.GET_FILMS_ID,
  });
  const { films } = queryResult.data;

  // Get the paths we want to pre-render based on films
  const paths = films.map((film) => {
    return {
      params: { id: film.id },
    };
  });
  return { paths, fallback: true };
}

// This also gets called at build time
export async function getStaticProps({ params: { id } }) {
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
    revalidate: 5 * 60,
  };
}

export default film;
