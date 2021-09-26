import { gql, QueryHookOptions } from "@apollo/client";
import { useCustomQuery } from "./useCustomQuery";

type GetUserInput = {
  id: string;
};

type GetUserResponse = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    isAdmin: boolean;
  };
};

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

export const useGetUser = (
  props: QueryHookOptions<GetUserResponse, GetUserInput> = {}
) => useCustomQuery(GET_USER, props);
