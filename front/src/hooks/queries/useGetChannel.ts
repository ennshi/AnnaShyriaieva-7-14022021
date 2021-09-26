import { gql, QueryHookOptions } from "@apollo/client";
import { Channel } from "../../types";

import { useCustomQuery } from "./useCustomQuery";

type GetChannelInput = { id: string };
type GetChannelResponse = { channel: Channel };

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

export const useGetChannel = (
  props: QueryHookOptions<GetChannelResponse, GetChannelInput> = {}
) => useCustomQuery(GET_CHANNEL, props);
