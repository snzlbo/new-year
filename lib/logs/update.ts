import { UpdateLogsMutationVariables, UpdateLogsMutation } from '@/types/API'
import { gql, ApolloClient } from '@apollo/client'
import { execMutation } from '@/lib/graphql'

export const GQL_UPDATE_LOGS = gql`
  mutation UpdateLogs(
    $input: UpdateLogsInput!
    $condition: ModelLogsConditionInput
  ) {
    updateLogs(input: $input, condition: $condition) {
      id
    }
  }
`

export type UpdateLogsReq = UpdateLogsMutationVariables
export type UpdateLogsResp = UpdateLogsMutation

type UpdateLogs = (
  client: ApolloClient<object>,
  req: UpdateLogsReq
) => Promise<UpdateLogsResp['updateLogs']>

export const update: UpdateLogs = async (client, req) => {
  const data = await execMutation<UpdateLogsReq, UpdateLogsMutation>({
    client,
    mutation: GQL_UPDATE_LOGS,
    variables: req,
  })
  return data.updateLogs
}
