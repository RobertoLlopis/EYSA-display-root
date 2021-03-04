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
