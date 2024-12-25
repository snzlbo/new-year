/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateLogs = /* GraphQL */ `subscription OnCreateLogs($filter: ModelSubscriptionLogsFilterInput) {
  onCreateLogs(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateLogsSubscriptionVariables,
  APITypes.OnCreateLogsSubscription
>;
export const onUpdateLogs = /* GraphQL */ `subscription OnUpdateLogs($filter: ModelSubscriptionLogsFilterInput) {
  onUpdateLogs(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateLogsSubscriptionVariables,
  APITypes.OnUpdateLogsSubscription
>;
export const onDeleteLogs = /* GraphQL */ `subscription OnDeleteLogs($filter: ModelSubscriptionLogsFilterInput) {
  onDeleteLogs(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteLogsSubscriptionVariables,
  APITypes.OnDeleteLogsSubscription
>;
