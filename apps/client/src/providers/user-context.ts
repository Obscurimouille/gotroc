import { User } from "@gotroc/types";
import { createContext } from "react";

export interface UserContextInput {
  user?: User | null;
  logout: () => void;
}

export const UserContext = createContext<UserContextInput>({
  user: null,
  logout: () => {},
});
