import { gql, QueryHookOptions } from "@apollo/client";
import { GetUserInput } from "../../types";
import { useCustomQuery } from "./useCustomQuery";

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      username
      firstName
      lastName
      isAdmin
      email
    }
  }
`;

export const useGetUser = (props: QueryHookOptions<GetUserInput> = {}) =>
  useCustomQuery(GET_USER, props);
