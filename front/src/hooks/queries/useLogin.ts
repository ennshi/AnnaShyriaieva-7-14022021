import { gql, LazyQueryHookOptions } from "@apollo/client";
import { useCustomLazyQuery } from "./useCustomLazyQuery";

type LoginInput = {
  username: string;
  password: string;
};

export const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password })
  }
`;

export const useLogin = (props: LazyQueryHookOptions<any, LoginInput>) =>
  useCustomLazyQuery<any, LoginInput>(LOGIN, props);
