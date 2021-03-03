import { gql } from "@apollo/client";
import TabCard from "components/TabCard/TabCard";
import { initializeApollo } from "src/apollo";
import Layout from "../components/Layout/Layout";

const InitalQuery = gql`
  query {
    films {
      title
    }
  }
`;

export default function Home() {
  return (
    <Layout>
      <h1>Explore our catalog</h1>
      <TabCard />
    </Layout>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: InitalQuery,
  });

  const initialApolloState = apolloClient.cache.extract();

  return {
    props: {
      initialApolloState,
    },
  };
}
