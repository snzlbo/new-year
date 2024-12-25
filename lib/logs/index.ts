import { useApolloClient } from '@apollo/client'
import { create, type CreateLogsReq, type CreateLogsResp } from './create'
import { deleteLog, type DeleteLogsReq, type DeleteLogsResp } from './delete'
import { get, type GetLogsReq, type GetLogsResp } from './get'
import { list, type ListLogsReq, type ListLogsResp } from './list'
import { onUpdate } from './onUpdate'
import { update, type UpdateLogsReq, type UpdateLogsResp } from './update'

type UseLogApi = () => {
  create: (variables: CreateLogsReq) => Promise<CreateLogsResp['createLogs']>
  delete: (variables: DeleteLogsReq) => Promise<DeleteLogsResp['deleteLogs']>
  get: (variables: GetLogsReq) => Promise<GetLogsResp['getLogs']>
  list: (variables: ListLogsReq) => Promise<ListLogsResp['logByDate']>
  update: (variables: UpdateLogsReq) => Promise<UpdateLogsResp['updateLogs']>
  onUpdate: (id: string) => void
}
export const useLogApi: UseLogApi = () => {
  const client = useApolloClient()

  return {
    create: async (variables) => {
      return await create(client, variables)
    },
    delete: async (variables) => {
      return await deleteLog(client, variables)
    },
    get: async (variables) => {
      return await get(client, variables)
    },
    list: async (variables) => {
      return await list(client, variables)
    },
    onUpdate: (id) => {
      return onUpdate(id)
    },
    update: async (variables) => {
      return await update(client, variables)
    },
  }
}
