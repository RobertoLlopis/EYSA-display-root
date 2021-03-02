import React from "react";
import { useQuery, gql } from "@apollo/client";
import { initializeApollo } from "src/apollo";
import Layout from "../../components/Layout/Layout";
import filmCatalog from "@eysa/server/data/filmCatalog.json";
const MyQuery = gql`
  query MyQuery {
    name
  }
`;

export default function Films(props) {
  console.log(props.data);
  const { data } = props;
  return <Layout> Films section: {data.map((d) => JSON.stringify(d))}</Layout>;
}

export async function getStaticProps() {
  return {
    props: { data: filmCatalog }, // will be passed to the page component as props
  };
}
