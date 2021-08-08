import { gql, QueryHookOptions } from "@apollo/client";
import { useCustomQuery } from "./useCustomQuery";

export const GET_CHANNELS = gql`
  query getChannels {
    channels {
      id
      name
    }
  }
`;

export const useGetChannels = (props: QueryHookOptions<any> = {}) =>
  useCustomQuery(GET_CHANNELS, props);
