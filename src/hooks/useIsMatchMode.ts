import { BooleanParam, useQueryParam } from "use-query-params";

const useIsMatchMode = () => {
  const [isMatchMode, setIsMatchMode] = useQueryParam("match", BooleanParam);

  return [Boolean(isMatchMode), setIsMatchMode] as const;
};

export default useIsMatchMode;
