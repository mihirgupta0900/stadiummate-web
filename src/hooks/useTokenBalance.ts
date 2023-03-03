import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const useTokenBalance = () => {
  const { data: session } = useSession();

  return api.user.getTokenBalance.useQuery(undefined, {
    enabled: !!session,
    retry: false,
  });
};

export default useTokenBalance;
