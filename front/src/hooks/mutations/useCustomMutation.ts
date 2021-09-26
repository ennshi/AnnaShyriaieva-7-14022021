import {
  ApolloCache,
  DefaultContext,
  DocumentNode,
  MutationHookOptions,
  useMutation,
} from "@apollo/client";

export const useCustomMutation = <TResponse, TInput>(
  mutation: DocumentNode,
  options?: MutationHookOptions<
    TResponse,
    TInput,
    DefaultContext,
    ApolloCache<any>
  >
) => {
  return useMutation(mutation, options);
};
