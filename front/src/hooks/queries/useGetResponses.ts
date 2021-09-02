import { gql, QueryHookOptions } from "@apollo/client";
import { GetResponsesInput } from "../../types";
import { useCustomQuery } from "./useCustomQuery";

export const GET_RESPONSES = gql`
  query getResponses($messageId: ID!, $offset: Int, $limit: Int) {
    responses(input: { offset: $offset, limit: $limit, id: $messageId }) {
      messages {
        id
        text
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
  props: QueryHookOptions<GetResponsesInput> = {}
) => useCustomQuery(GET_RESPONSES, props);
