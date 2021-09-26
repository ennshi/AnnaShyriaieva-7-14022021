import { gql, QueryHookOptions } from "@apollo/client";
import { Channel } from "../../types";
import { useCustomQuery } from "./useCustomQuery";

type GetChannelsResponse = { channels: Channel[] };

export const GET_CHANNELS = gql`
  query getChannels {
    channels {
      id
      name
      users {
        id
      }
    }
  }
`;

export const useGetChannels = (
  props: QueryHookOptions<GetChannelsResponse> = {}
) => useCustomQuery(GET_CHANNELS, props);
