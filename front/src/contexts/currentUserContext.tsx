import React, { createContext, useContext, useEffect } from "react";
import { useGetCurrentUser } from "../hooks/queries/useGetCurrentUser";
import { User } from "../types";
import { useApollo } from "./apolloContext";

type CurrentUserContextType = {
  currentUser?: User | null;
};

const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
});

export const CurrentUserProvider: React.FC = ({ children }) => {
  const { data, error } = useGetCurrentUser();
  const { clearToken } = useApollo();

  useEffect(() => {
    if (!data?.currentUser && error) {
      clearToken();
    }
  }, [data, clearToken, error]);

  return (
    <CurrentUserContext.Provider value={{ currentUser: data?.currentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  return context;
};
