import { useEffect } from "react";
import TabCard from "components/TabCard/TabCard";
import { initializeApollo } from "apollo/apollo";
import { queryDeclarations } from "utils/queryDeclarations";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
import { useAuthContext } from "context/AuthContext";
import { ROUTES } from "utils/routes";

export default function Home(props) {
  const router = useRouter();
  const { user } = useAuthContext();
  useEffect(() => {
    !user && router.push(ROUTES.LOGIN);
  }, []);
  return (
    <Layout>
      <h1>Explore our catalog</h1>
      <TabCard />
    </Layout>
  );
}

export async function getServerSideProps() {
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
