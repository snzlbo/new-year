import { execMutation } from '@/lib/graphql'
import { LogByDateQuery, LogByDateQueryVariables } from '@/types/API'
import { ApolloClient, gql } from '@apollo/client'

export const GQL_LIST_LOGS = gql`
  query LogByDate(
    $type: TYPE!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLogsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    logByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`

export type ListLogsReq = LogByDateQueryVariables
export type ListLogsResp = LogByDateQuery

type ListLogs = (
  client: ApolloClient<object>,
  req: ListLogsReq
) => Promise<ListLogsResp['logByDate']>

export const list: ListLogs = async (client, req) => {
  const data = await execMutation<ListLogsReq, ListLogsResp>({
    client,
    mutation: GQL_LIST_LOGS,
    variables: req,
  })
  return data.logByDate
}
