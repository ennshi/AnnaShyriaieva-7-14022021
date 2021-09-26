import { gql, MutationHookOptions } from "@apollo/client";
import { useCustomMutation } from "./useCustomMutation";

export type SignUpInput = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type SignUpResponse = {
  user: { id: string };
};

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

export const useSignUp = (
  props?: MutationHookOptions<SignUpResponse, SignUpInput>
) => useCustomMutation<SignUpResponse, SignUpInput>(SIGN_UP, props);
