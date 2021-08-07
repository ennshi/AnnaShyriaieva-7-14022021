import { gql, LazyQueryHookOptions } from "@apollo/client";
import { LoginInput } from "../../types";
import { useCustomLazyQuery } from "./useCustomLazyQuery";

export const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password })
  }
`;

export const useLogin = (props: LazyQueryHookOptions<any, LoginInput>) =>
  useCustomLazyQuery<LoginInput>(LOGIN, props);
