import { gql } from "@apollo/client";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import TabCard from "components/TabCard/TabCard";
import { initializeApollo } from "src/apollo";
import { queryDeclarations } from "utils/queryDeclarations";
import Layout from "../components/Layout/Layout";

export default function Home(props) {
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
    query: queryDeclarations.GET_FILMS,
  });

  const initialApolloState = apolloClient.cache.extract();

  return {
    props: {
      initialApolloState,
    },
  };
}
