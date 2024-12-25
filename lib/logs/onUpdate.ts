import { generateClient } from 'aws-amplify/api'
import * as APITypes from '@/types/API'

type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType
  __generatedSubscriptionOutput: OutputType
}

export const customOnUpdateLogs =
  /* GraphQL */ `subscription customOnUpdateLogs($filter: ModelSubscriptionSonyScoreFilterInput) {
  onUpdateLogs(filter: $filter) {
    id
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnUpdateLogsSubscriptionVariables,
    {
      onUpdateLogs?: {
        __typename: 'Logs'
        id: string
      } | null
    }
  >

type onUpdateLogs = (id: string) => Promise<void>

const client = generateClient()
console.log('🚀 ~ client:', client)

export const onUpdate: onUpdateLogs = async (id: string) => {
  return new Promise((resolve, reject) => {
    const subscription = client
      .graphql({
        query: customOnUpdateLogs,
        variables: { filter: { id: { eq: id } } },
      })
      .subscribe({
        next: async ({ data }) => {
          if (data && data.onUpdateLogs) {
            // await useSonyPredictionLogStore().getLog(predictionId)
            resolve()
          } else {
            console.error('No data received in subscription')
          }
        },
        error: (error) => {
          console.error('Subscription error:', error)
          reject(error)
        },
      })
    return () => {
      subscription.unsubscribe()
    }
  })
}
