import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const useLoggedInUser = () => {
  const { data: session } = useSession();
  return api.user.getUser.useQuery(undefined, {
    enabled: !!session,
  });
};

export default useLoggedInUser;
