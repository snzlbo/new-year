/* tslint:disable */

//  This file was automatically generated and should not be edited.

export type CreateLogsInput = {
  id?: string | null
  name?: string | null
  username?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  language?: LANGUAGE | null
  status?: STATUS | null
  videProfile?: string | null
  caption?: string | null
  audioFile?: string | null
  type?: TYPE | null
}

export enum LANGUAGE {
  ja = 'ja',
  en = 'en',
}

export enum STATUS {
  pending = 'pending',
  generating = 'generating',
  not_played = 'not_played',
  played = 'played',
  failed = 'failed',
}

export enum TYPE {
  new_year = 'new_year',
}

export type ModelLogsConditionInput = {
  name?: ModelStringInput | null
  username?: ModelStringInput | null
  createdAt?: ModelStringInput | null
  updatedAt?: ModelStringInput | null
  language?: ModelLANGUAGEInput | null
  status?: ModelSTATUSInput | null
  videProfile?: ModelStringInput | null
  caption?: ModelStringInput | null
  audioFile?: ModelStringInput | null
  type?: ModelTYPEInput | null
  and?: Array<ModelLogsConditionInput | null> | null
  or?: Array<ModelLogsConditionInput | null> | null
  not?: ModelLogsConditionInput | null
}

export type ModelStringInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type ModelLANGUAGEInput = {
  eq?: LANGUAGE | null
  ne?: LANGUAGE | null
}

export type ModelSTATUSInput = {
  eq?: STATUS | null
  ne?: STATUS | null
}

export type ModelTYPEInput = {
  eq?: TYPE | null
  ne?: TYPE | null
}

export type Logs = {
  __typename: 'Logs'
  id: string
  name?: string | null
  username?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  language?: LANGUAGE | null
  status?: STATUS | null
  videProfile?: string | null
  caption?: string | null
  audioFile?: string | null
  type?: TYPE | null
}

export type UpdateLogsInput = {
  id: string
  name?: string | null
  username?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  language?: LANGUAGE | null
  status?: STATUS | null
  videProfile?: string | null
  caption?: string | null
  audioFile?: string | null
  type?: TYPE | null
}

export type DeleteLogsInput = {
  id: string
}

export type ModelLogsFilterInput = {
  id?: ModelIDInput | null
  name?: ModelStringInput | null
  username?: ModelStringInput | null
  createdAt?: ModelStringInput | null
  updatedAt?: ModelStringInput | null
  language?: ModelLANGUAGEInput | null
  status?: ModelSTATUSInput | null
  videProfile?: ModelStringInput | null
  caption?: ModelStringInput | null
  audioFile?: ModelStringInput | null
  type?: ModelTYPEInput | null
  and?: Array<ModelLogsFilterInput | null> | null
  or?: Array<ModelLogsFilterInput | null> | null
  not?: ModelLogsFilterInput | null
}

export type ModelIDInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export type ModelLogsConnection = {
  __typename: 'ModelLogsConnection'
  items: Array<Logs | null>
  nextToken?: string | null
}

export type ModelStringKeyConditionInput = {
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
}

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type ModelSubscriptionLogsFilterInput = {
  id?: ModelSubscriptionIDInput | null
  name?: ModelSubscriptionStringInput | null
  username?: ModelSubscriptionStringInput | null
  createdAt?: ModelSubscriptionStringInput | null
  updatedAt?: ModelSubscriptionStringInput | null
  language?: ModelSubscriptionStringInput | null
  status?: ModelSubscriptionStringInput | null
  videProfile?: ModelSubscriptionStringInput | null
  caption?: ModelSubscriptionStringInput | null
  audioFile?: ModelSubscriptionStringInput | null
  type?: ModelSubscriptionStringInput | null
  and?: Array<ModelSubscriptionLogsFilterInput | null> | null
  or?: Array<ModelSubscriptionLogsFilterInput | null> | null
}

export type ModelSubscriptionIDInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  in?: Array<string | null> | null
  notIn?: Array<string | null> | null
}

export type ModelSubscriptionStringInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  in?: Array<string | null> | null
  notIn?: Array<string | null> | null
}

export type CreateLogsMutationVariables = {
  input: CreateLogsInput
  condition?: ModelLogsConditionInput | null
}

export type CreateLogsMutation = {
  createLogs?: {
    __typename: 'Logs'
    id: string
    name?: string | null
    username?: string | null
    createdAt?: string | null
    updatedAt?: string | null
    language?: LANGUAGE | null
    status?: STATUS | null
    videProfile?: string | null
    caption?: string | null
    audioFile?: string | null
    type?: TYPE | null
  } | null
}

export type UpdateLogsMutationVariables = {
  input: UpdateLogsInput
  condition?: ModelLogsConditionInput | null
}

export type UpdateLogsMutation = {
  updateLogs?: {
    __typename: 'Logs'
    id: string
    name?: string | null
    username?: string | null
    createdAt?: string | null
    updatedAt?: string | null
    language?: LANGUAGE | null
    status?: STATUS | null
    videProfile?: string | null
    caption?: string | null
    audioFile?: string | null
    type?: TYPE | null
  } | null
}

export type DeleteLogsMutationVariables = {
  input: DeleteLogsInput
  condition?: ModelLogsConditionInput | null
}

export type DeleteLogsMutation = {
  deleteLogs?: {
    __typename: 'Logs'
    id: string
    name?: string | null
    username?: string | null
    createdAt?: string | null
    updatedAt?: string | null
    language?: LANGUAGE | null
    status?: STATUS | null
    videProfile?: string | null
    caption?: string | null
    audioFile?: string | null
    type?: TYPE | null
  } | null
}

export type GetLogsQueryVariables = {
  id: string
}

export type GetLogsQuery = {
  getLogs?: {
    __typename: 'Logs'
    id: string
    name?: string | null
    username?: string | null
    createdAt?: string | null
    updatedAt?: string | null
    language?: LANGUAGE | null
    status?: STATUS | null
    videProfile?: string | null
    caption?: string | null
    audioFile?: string | null
    type?: TYPE | null
  } | null
}

export type ListLogsQueryVariables = {
  filter?: ModelLogsFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListLogsQuery = {
  listLogs?: {
    __typename: 'ModelLogsConnection'
    items: Array<{
      __typename: 'Logs'
      id: string
      name?: string | null
      username?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      language?: LANGUAGE | null
      status?: STATUS | null
      videProfile?: string | null
      caption?: string | null
      audioFile?: string | null
      type?: TYPE | null
    } | null>
    nextToken?: string | null
  } | null
}

export type LogByDateQueryVariables = {
  type: TYPE
  createdAt?: ModelStringKeyConditionInput | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelLogsFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type LogByDateQuery = {
  logByDate?: {
    __typename: 'ModelLogsConnection'
    items: Array<{
      __typename: 'Logs'
      id: string
      name?: string | null
      username?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      language?: LANGUAGE | null
      status?: STATUS | null
      videProfile?: string | null
      caption?: string | null
      audioFile?: string | null
      type?: TYPE | null
    } | null>
    nextToken?: string | null
  } | null
}

export type OnCreateLogsSubscriptionVariables = {
  filter?: ModelSubscriptionLogsFilterInput | null
}

export type OnCreateLogsSubscription = {
  onCreateLogs?: {
    __typename: 'Logs'
    id: string
    name?: string | null
    username?: string | null
    createdAt?: string | null
    updatedAt?: string | null
    language?: LANGUAGE | null
    status?: STATUS | null
    videProfile?: string | null
    caption?: string | null
    audioFile?: string | null
    type?: TYPE | null
  } | null
}

export type OnUpdateLogsSubscriptionVariables = {
  filter?: ModelSubscriptionLogsFilterInput | null
}

export type OnUpdateLogsSubscription = {
  onUpdateLogs?: {
    __typename: 'Logs'
    id: string
    name?: string | null
    username?: string | null
    createdAt?: string | null
    updatedAt?: string | null
    language?: LANGUAGE | null
    status?: STATUS | null
    videProfile?: string | null
    caption?: string | null
    audioFile?: string | null
    type?: TYPE | null
  } | null
}

export type OnDeleteLogsSubscriptionVariables = {
  filter?: ModelSubscriptionLogsFilterInput | null
}

export type OnDeleteLogsSubscription = {
  onDeleteLogs?: {
    __typename: 'Logs'
    id: string
    name?: string | null
    username?: string | null
    createdAt?: string | null
    updatedAt?: string | null
    language?: LANGUAGE | null
    status?: STATUS | null
    videProfile?: string | null
    caption?: string | null
    audioFile?: string | null
    type?: TYPE | null
  } | null
}
