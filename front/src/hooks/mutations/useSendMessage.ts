import { gql, MutationHookOptions } from "@apollo/client";
import { useCustomMutation } from "./useCustomMutation";

type SendMessageResponse = {
  message: { id: string };
};

type SendMessageInput = {
  text: string;
  image?: File;
  toMessageId?: string;
  channelId: string;
};

export const SEND_MESSAGE = gql`
  mutation createMessage(
    $text: String!
    $image: Upload
    $toMessageId: ID
    $channelId: ID!
  ) {
    createMessage(
      input: {
        text: $text
        image: $image
        channelId: $channelId
        toMessageId: $toMessageId
      }
    ) {
      id
    }
  }
`;

export const useSendMessage = (
  props?: MutationHookOptions<SendMessageResponse, SendMessageInput>
) =>
  useCustomMutation<SendMessageResponse, SendMessageInput>(SEND_MESSAGE, props);
