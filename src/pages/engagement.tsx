import React, { useEffect } from "react";
import { api, type RouterOutputs } from "~/utils/api";
const Engagement = () => {
  const { data, error } = api.engagement;

  return <div>Engagement</div>;
};

export default Engagement;
