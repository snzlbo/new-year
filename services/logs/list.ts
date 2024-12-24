import { gql, ApolloClient } from '@apollo/client'
import { execMutation } from '@/lib/graphql'
import { listLogs } from '@/graphql/queries'
import { ListLogsQuery, ListLogsQueryVariables } from '@/types/API'

export const GQL_LIST_LOGS = gql(listLogs)

export type ListLogsReq = ListLogsQueryVariables 

export type ListLogsResp = ListLogsQuery

type ListLogs = (client: ApolloClient<object>, req: ListLogsReq) => Promise<ListLogsResp['listLogs']>

export const list: ListLogs = async (client, req) => {
  const data = await execMutation<ListLogsReq, ListLogsResp>({
    client,
    mutation: GQL_LIST_LOGS,
    variables: req
  })
  return data.listLogs
}
