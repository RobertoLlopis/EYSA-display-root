import { useApolloClient, useQuery } from "@apollo/client";
import { Card, Divider } from "antd";
import { Fragment, useState } from "react";
import TabRow from "./Row/Row";
import FilmSnap from "./FilmSnap/FilmSnap";
import { queryDeclarations } from "utils/queryDeclarations";

const contentSoon = (entity) => entity + " content soon available";

function TabCard() {
  const {
    data: { films },
  } = useQuery(queryDeclarations.GET_FILMS);
  const [tabState, setTabState] = useState({
    tabKey: "films",
  });
  const tabList = [
    {
      key: "films",
      tab: "Films",
    },
    {
      key: "music",
      tab: "Music",
    },
    {
      key: "podcasts",
      tab: "Podcasts",
    },
    {
      key: "books",
      tab: "Books",
    },
  ];
  const contentList = {
    films: films.map((f, i: number) => (
      <Fragment key={i}>
        <TabRow>
          <FilmSnap film={f} />
        </TabRow>
        {i !== films.length - 1 && <Divider />}
      </Fragment>
    )),
    music: <p>{contentSoon("Music")}</p>,
    podcasts: <p>{contentSoon("Podcasts")}</p>,
    books: <p>{contentSoon("Books")}</p>,
  };
  const onTabChange = (key) => {
    setTabState({ tabKey: key });
  };

  return (
    <Card
      style={{ width: "100%" }}
      tabList={tabList}
      activeTabKey={tabState.tabKey}
      tabBarExtraContent={<a href="#">More</a>}
      onTabChange={(key) => {
        onTabChange(key);
      }}
    >
      {contentList[tabState.tabKey]}
    </Card>
  );
}

export default TabCard;
