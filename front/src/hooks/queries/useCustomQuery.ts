import { DocumentNode, QueryHookOptions, useQuery } from "@apollo/client";

export const useCustomQuery = <TResponse, TInput>(
  query: DocumentNode,
  options?: QueryHookOptions<TResponse, TInput>
) => {
  return useQuery(query, options);
};
