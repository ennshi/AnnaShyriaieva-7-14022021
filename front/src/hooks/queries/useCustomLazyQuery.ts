import {
  DocumentNode,
  LazyQueryHookOptions,
  useLazyQuery,
} from "@apollo/client";

export const useCustomLazyQuery = <T>(
  query: DocumentNode,
  options: LazyQueryHookOptions<any, T>
) => {
  return useLazyQuery(query, options);
};
