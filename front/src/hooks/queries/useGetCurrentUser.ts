import { gql, QueryHookOptions } from "@apollo/client";
import { useCustomQuery } from "./useCustomQuery";

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

export const useGetCurrentUser = (props: QueryHookOptions<any> = {}) =>
  useCustomQuery(GET_CURRENT_USER, props);
