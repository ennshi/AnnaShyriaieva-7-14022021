import { gql, MutationHookOptions } from "@apollo/client";
import { useCustomMutation } from "./useCustomMutation";

type DeleteUserInput = {
  id: string;
};

type DeleteUserResponse = {
  user: { id: string };
};

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const useDeleteUser = (
  props?: MutationHookOptions<DeleteUserResponse, DeleteUserInput>
) => useCustomMutation<DeleteUserResponse, DeleteUserInput>(DELETE_USER, props);
