import React, { FC } from "react";
import Matches from "~/components/feeds/Matches";
import Video from "~/components/feeds/Video";
import Layout from "~/components/Layout";

const Updates: FC = () => {
  return (
    <Layout>
      <Matches />
      <Video />
    </Layout>
  );
};

export default Updates;
