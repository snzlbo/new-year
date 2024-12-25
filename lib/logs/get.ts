import { execQuery } from '@/lib/graphql'
import { GetLogsQuery, GetLogsQueryVariables } from '@/types/API'
import { ApolloClient, gql } from '@apollo/client'

export const GQL_GET_LOGS = gql`
  query GetLogs($id: ID!) {
    getLogs(id: $id) {
      id
      name
      username
      createdAt
      updatedAt
      language
      status
      videProfile
      caption
      audioFile
      type
      __typename
    }
  }
`

export type GetLogsReq = GetLogsQueryVariables
export type GetLogsResp = GetLogsQuery

type GetLogs = (
  client: ApolloClient<object>,
  req: GetLogsReq
) => Promise<GetLogsResp['getLogs']>

export const get: GetLogs = async (client, req) => {
  const data = await execQuery<GetLogsReq, GetLogsResp>({
    client,
    query: GQL_GET_LOGS,
    variables: req,
  })
  return data.getLogs
}
