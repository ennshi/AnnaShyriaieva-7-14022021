import { gql, QueryHookOptions } from "@apollo/client";
import { User } from "../../types";
import { useCustomQuery } from "./useCustomQuery";

type GetCurrentUserResponse = {
  currentUser: User;
};

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      username
      firstName
      lastName
      isAdmin
    }
  }
`;

export const useGetCurrentUser = (
  props: QueryHookOptions<GetCurrentUserResponse, any> = {}
) => useCustomQuery(GET_CURRENT_USER, props);
