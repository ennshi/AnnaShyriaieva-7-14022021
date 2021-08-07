import {
  ApolloCache,
  DefaultContext,
  DocumentNode,
  MutationHookOptions,
  useMutation,
} from "@apollo/client";

export const useCustomMutation = <T>(
  mutation: DocumentNode,
  options?: MutationHookOptions<any, T, DefaultContext, ApolloCache<any>>
) => {
  return useMutation(mutation, options);
};
