import ApiClient from "@/lib/api";
import type { User } from "@/types/User";

export interface LoaderData {
  users: User[];
}

export const loader = async () => {
  const users = await ApiClient.getUsers();
  return { users };
};
