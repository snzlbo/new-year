import { DeleteLogsMutationVariables, DeleteLogsMutation } from '@/types/API'
import { gql, ApolloClient } from '@apollo/client'
import { execMutation } from '@/lib/graphql'

export const GQL_Delete_LOGS = gql`
  mutation DeleteLogs(
    $input: DeleteLogsInput!
    $condition: ModelLogsConditionInput
  ) {
    deleteLogs(input: $input, condition: $condition) {
      id
      name
      username
      DeletedAt
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

export type DeleteLogsReq = DeleteLogsMutationVariables
export type DeleteLogsResp = DeleteLogsMutation

type DeleteLogs = (
  client: ApolloClient<object>,
  req: DeleteLogsReq
) => Promise<DeleteLogsResp['deleteLogs']>

export const deleteLog: DeleteLogs = async (client, req) => {
  const data = await execMutation<DeleteLogsReq, DeleteLogsMutation>({
    client,
    mutation: GQL_Delete_LOGS,
    variables: req,
  })
  return data.deleteLogs
}
