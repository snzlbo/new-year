/* tslint:disable */
 
// this is an auto generated file. This will be overwritten

import * as APITypes from "../types/API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createLogs = /* GraphQL */ `mutation CreateLogs(
  $input: CreateLogsInput!
  $condition: ModelLogsConditionInput
) {
  createLogs(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateLogsMutationVariables,
  APITypes.CreateLogsMutation
>;
export const updateLogs = /* GraphQL */ `mutation UpdateLogs(
  $input: UpdateLogsInput!
  $condition: ModelLogsConditionInput
) {
  updateLogs(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateLogsMutationVariables,
  APITypes.UpdateLogsMutation
>;
export const deleteLogs = /* GraphQL */ `mutation DeleteLogs(
  $input: DeleteLogsInput!
  $condition: ModelLogsConditionInput
) {
  deleteLogs(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteLogsMutationVariables,
  APITypes.DeleteLogsMutation
>;
