import { gql, QueryHookOptions } from "@apollo/client";
import { GetChannelInput } from "../../types";
import { useCustomQuery } from "./useCustomQuery";

export const GET_CHANNEL = gql`
  query getChannel($id: ID!) {
    channel(id: $id) {
      id
      name
      users {
        id
        username
      }
    }
  }
`;

export const useGetChannel = (props: QueryHookOptions<GetChannelInput> = {}) =>
  useCustomQuery(GET_CHANNEL, props);
