import { gql, useQuery } from "@apollo/client";
import { initializeApollo } from "src/apollo";
import Layout from "../../components/Layout/Layout";
import { queryDeclarations } from "../../utils/queryDeclarations";
import styles from "./Films.module.scss";
import FilmCard from "components/FilmCard/FilmCard";

export default function Films() {
  const { loading, data } = useQuery(queryDeclarations.GET_FILMS);
  return (
    <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Film Catalog</h2>
          <section className={styles.section}>
            {data.films.map((film, i) => (
              <FilmCard key={i} film={film} />
            ))}
          </section>
        </>
      )}
    </Layout>
  );
}
