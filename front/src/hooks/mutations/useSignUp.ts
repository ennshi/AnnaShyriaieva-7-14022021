import { gql, MutationHookOptions } from "@apollo/client";
import { SignUpInput } from "../../types";
import { useCustomMutation } from "./useCustomMutation";

export const SIGN_UP = gql`
  mutation signUp(
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    createUser(
      input: {
        username: $username
        password: $password
        firstName: $firstName
        lastName: $lastName
        email: $email
      }
    ) {
      id
    }
  }
`;

export const useSignUp = (props?: MutationHookOptions<any, SignUpInput>) =>
  useCustomMutation<SignUpInput>(SIGN_UP, props);
