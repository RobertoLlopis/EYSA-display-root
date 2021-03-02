import { useQuery, gql } from "@apollo/client";
import { initializeApollo } from "src/apollo";
import Layout from "../components/Layout/Layout";

//import { FilmCardContent } from "@eysa/films/components";
const MyQuery = gql`
  query {
    films {
      title
    }
  }
`;

export default function Home(props) {
  /* const { data, loading } = useQuery(MyQuery); */
  console.log(props);
  return (
    <Layout>
      {/* <FilmCardContent /> */}
      <p>{JSON.stringify(props.intialApolloState)}</p>
    </Layout>
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
