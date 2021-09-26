import { gql, MutationHookOptions } from "@apollo/client";
import { useCustomMutation } from "./useCustomMutation";

type CreateChannelInput = {
  name: string;
  users: string[];
};

type CreateChannelResponse = {
  channel: { id: string };
};

export const CREATE_CHANNEL = gql`
  mutation createChannel($name: String!, $users: [ID]!) {
    createChannel(input: { name: $name, users: $users }) {
      id
    }
  }
`;

export const useCreateChannel = (
  props?: MutationHookOptions<CreateChannelResponse, CreateChannelInput>
) =>
  useCustomMutation<CreateChannelResponse, CreateChannelInput>(
    CREATE_CHANNEL,
    props
  );
