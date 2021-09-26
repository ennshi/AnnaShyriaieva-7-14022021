import {
  DocumentNode,
  LazyQueryHookOptions,
  useLazyQuery,
} from "@apollo/client";

export const useCustomLazyQuery = <TResponse, TInput>(
  query: DocumentNode,
  options: LazyQueryHookOptions<TResponse, TInput>
) => {
  return useLazyQuery(query, options);
};
