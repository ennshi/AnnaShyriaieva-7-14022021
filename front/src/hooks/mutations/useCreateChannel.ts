import { gql, MutationHookOptions } from "@apollo/client";
import { CreateChannelInput } from "../../types";
import { useCustomMutation } from "./useCustomMutation";

export const CREATE_CHANNEL = gql`
  mutation createChannel($name: String!, $users: [ID]!) {
    createChannel(input: { name: $name, users: $users }) {
      id
    }
  }
`;

export const useCreateChannel = (
  props?: MutationHookOptions<any, CreateChannelInput>
) => useCustomMutation<CreateChannelInput>(CREATE_CHANNEL, props);
