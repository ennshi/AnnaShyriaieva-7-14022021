import { DocumentNode, QueryHookOptions, useQuery } from "@apollo/client";

export const useCustomQuery = <T>(
  query: DocumentNode,
  options?: QueryHookOptions<any, T>
) => {
  return useQuery(query, options);
};
