import { useApolloClient } from '@apollo/client'
import { create, type CreateLogsReq, type CreateLogsResp } from './create'
import { list, type ListLogsReq, type ListLogsResp } from './list'

type UseLogApi = () => {
  create: (variables: CreateLogsReq) => Promise<CreateLogsResp['createLogs']>
  list: (variables: ListLogsReq) => Promise<ListLogsResp['listLogs']>
}
export const useLogApi: UseLogApi = () => {
  const client = useApolloClient()

  return {
    create: async (variables) => {
      return await create(client, variables)
    },
    list: async (variables) => {
      return await list(client, variables)
    },
  }
}
