import { gql, QueryHookOptions } from "@apollo/client";
import { Message } from "../../types";
import { useCustomQuery } from "./useCustomQuery";

type GetResponsesInput = {
  messageId: string;
  offset: number;
  limit: number;
};

type GetResponsesResponse = {
  responses: { messages: Message[]; count: number };
};
export const GET_RESPONSES = gql`
  query getResponses($messageId: ID!, $offset: Int, $limit: Int) {
    responses(input: { offset: $offset, limit: $limit, id: $messageId }) {
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
        createdAt
      }
      count
    }
  }
`;

export const useGetResponses = (
  props: QueryHookOptions<GetResponsesResponse, GetResponsesInput> = {}
) => useCustomQuery(GET_RESPONSES, props);
