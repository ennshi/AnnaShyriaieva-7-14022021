import { gql, MutationHookOptions } from "@apollo/client";
import { SendMessageInput } from "../../types";
import { useCustomMutation } from "./useCustomMutation";

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
  props?: MutationHookOptions<any, SendMessageInput>
) => useCustomMutation<SendMessageInput>(SEND_MESSAGE, props);
