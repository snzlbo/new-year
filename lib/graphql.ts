import { ApolloClient, DocumentNode, FetchPolicy, OperationVariables } from '@apollo/client'

export const execQuery = async <Req extends OperationVariables, Resp>({ client, query, variables, fetchPolicy }: { client: ApolloClient<object>, query: DocumentNode, variables?: Req, fetchPolicy?: FetchPolicy }): Promise<Resp> => {
  const { data, errors } = await client.query<Resp, Req>({
    query,
    variables,
    fetchPolicy
  })
  if (errors) {
    throw new Error('Query failed. (' + errors.map(err => err.message).join() + ')')
  } else if (!data) {
    throw new Error('Query failed. Response empty')
  } else {
    return data as Resp
  }
}

export const execMutation = async <Req extends OperationVariables, Resp>({ client, mutation, variables }: { client: ApolloClient<object>, mutation: DocumentNode, variables?: Req }): Promise<Resp> => {
  const { data, errors } = await client.mutate<Resp, Req>({
    mutation,
    variables
  })
  if (errors) {
    throw new Error('Mutation failed. (' + errors.map(err => err.message).join() + ')')
  } else if (!data) {
    throw new Error('Mutation failed. Response empty')
  } else {
    return data as Resp
  }
}
