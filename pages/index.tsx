import Head from "next/head";
import { useQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";
import { initializeApollo } from "src/apollo";
//import { FilmCardContent } from "@eysa/films/components";
const MyQuery = gql`
  query MyQuery {
    name
  }
`;

export default function Home(props) {
  const { data, loading } = useQuery(MyQuery);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <FilmCardContent /> */}
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: MyQuery,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
