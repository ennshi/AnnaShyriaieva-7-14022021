import { gql, MutationHookOptions } from "@apollo/client";
import { DeleteUserInput } from "../../types";
import { useCustomMutation } from "./useCustomMutation";

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const useDeleteUser = (
  props?: MutationHookOptions<any, DeleteUserInput>
) => useCustomMutation<DeleteUserInput>(DELETE_USER, props);
