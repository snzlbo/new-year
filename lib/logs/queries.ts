/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getLogs = /* GraphQL */ `query GetLogs($id: ID!) {
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
` as GeneratedQuery<APITypes.GetLogsQueryVariables, APITypes.GetLogsQuery>;
export const listLogs = /* GraphQL */ `query ListLogs($filter: ModelLogsFilterInput, $limit: Int, $nextToken: String) {
  listLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
` as GeneratedQuery<APITypes.ListLogsQueryVariables, APITypes.ListLogsQuery>;
export const logByDate = /* GraphQL */ `query LogByDate(
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
` as GeneratedQuery<APITypes.LogByDateQueryVariables, APITypes.LogByDateQuery>;
