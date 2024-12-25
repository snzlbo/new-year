import awsmobile from '@/aws-exports'
import { createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: awsmobile.aws_appsync_graphqlEndpoint,
  fetchOptions: { cache: 'no-store' },
  credentials: 'same-origin',
  headers: {
    'x-api-key': awsmobile.aws_appsync_apiKey,
  },
})

export default httpLink
