import { gql, QueryHookOptions } from "@apollo/client";
import { GetMessagesInput } from "../../types";
import { useCustomQuery } from "./useCustomQuery";

export const GET_MESSAGES = gql`
  query getMessages($channelId: ID, $offset: Int, $limit: Int) {
    messages(input: { offset: $offset, limit: $limit, channelId: $channelId }) {
      messages {
        id
        text
        image
        from {
          id
          username
          firstName
          lastName
        }
        responses
        createdAt
        toMessage
      }
      count
    }
  }
`;

export const useGetMessages = (
  props: QueryHookOptions<GetMessagesInput> = {}
) => useCustomQuery(GET_MESSAGES, props);
