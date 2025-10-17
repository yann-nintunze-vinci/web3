import type { User } from "@/types/User";
import { useOutletContext } from "react-router";

export const useCurrentUser = () => {
  const { currentUser } = useOutletContext<{ currentUser: User | null }>();
  return currentUser;
};
