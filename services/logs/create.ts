import { CreateLogsMutationVariables, CreateLogsMutation } from '@/types/API';
import { gql, ApolloClient } from '@apollo/client'
import { execMutation } from '@/lib/graphql'
import { createLogs } from '@/graphql/mutations'

export const GQL_CREATE_LOGS = gql(createLogs)

export type CreateLogsReq = CreateLogsMutationVariables
export type CreateLogsResp = CreateLogsMutation

type CreateLogs = (client: ApolloClient<object>, req: CreateLogsReq) => Promise<CreateLogsResp['createLogs']>

export const create: CreateLogs = async (client, req) => {
  const data = await execMutation<CreateLogsReq, CreateLogsMutation>({
    client,
    mutation: GQL_CREATE_LOGS,
    variables: req
  })
  return data.createLogs
}
