import { gql, QueryHookOptions } from "@apollo/client";
import { User } from "../../types";
import { useCustomQuery } from "./useCustomQuery";

type GetUsersResponse = {
  users: User[];
};

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

export const useGetUsers = (props: QueryHookOptions<GetUsersResponse> = {}) =>
  useCustomQuery(GET_USERS, props);
