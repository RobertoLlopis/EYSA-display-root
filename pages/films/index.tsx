import { useRouter } from "next/router";
import { useEffect } from "react";
import { initializeApollo } from "apollo/apollo";
import { useAuthContext } from "context/AuthContext";
import Layout from "../../components/Layout/Layout";
import FilmCard from "components/FilmCard/FilmCard";
import { queryDeclarations } from "../../utils/queryDeclarations";
import { ROUTES } from "../../utils/routes";
import styles from "./Films.module.scss";

export default function Films({ films }) {
  const router = useRouter();
  const { user } = useAuthContext();
  useEffect(() => {
    !user && router.push(ROUTES.LOGIN);
  }, []);
  return (
    <Layout>
      <>
        <h2>Film Catalog</h2>
        <section className={styles.section}>
          {films.map((film, i) => (
            <FilmCard key={i} film={film} />
          ))}
        </section>
      </>
    </Layout>
  );
}
export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const {
    data: { films },
  } = await apolloClient.query({
    query: queryDeclarations.GET_FILMS,
  });

  const initialApolloState = apolloClient.cache.extract();

  return {
    props: {
      initialApolloState,
      films,
    },
  };
}
