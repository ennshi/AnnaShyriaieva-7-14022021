import { gql, QueryHookOptions } from "@apollo/client";
import { useCustomQuery } from "./useCustomQuery";

export const GET_USERS = gql`
  query getUsers {
    users {
      id
      username
      firstName
      lastName
    }
  }
`;

export const useGetUsers = (props: QueryHookOptions<any> = {}) =>
  useCustomQuery(GET_USERS, props);
