import { ExtLinkOptions, FileOptions, HitOptions, NotBounceOptions } from './options';
import {
  FirstPartyParamsParameters,
  InitParameters,
  UserParameters,
  VisitParameters,
} from './parameters';

export type InitEventParameters = [eventName: 'init', parameters: InitParameters];

export type AddFileExtensionEventParameters = [
  eventName: 'addFileExtension',
  extensions: string | string[],
];

export type ExtLinkEventParameters = [eventName: 'extLink', url: string, options?: ExtLinkOptions];

export type FileEventParameters = [eventName: 'file', url: string, options?: FileOptions];

export type FirstPartyParamsEventParameters = [
  eventName: 'firstPartyParams',
  parameters: FirstPartyParamsParameters,
];

export type GetClientIDEventParameters = [eventName: 'getClientID', cb: (clientID: string) => void];

export type HitEventParameters = [eventName: 'hit', url: string, options?: HitOptions];

export type NotBounceEventParameters = [eventName: 'notBounce', options?: NotBounceOptions];

export type ParamsEventParameters = [
  eventName: 'params',
  /** Session parameters. @see https://yandex.com/support/metrica/objects/params-method.html */
  parameters: VisitParameters | VisitParameters[],
];

export type ReachGoalEventParameters = [
  eventName: 'reachGoal',
  target: string,
  /** Session parameters. @see https://yandex.com/support/metrica/objects/params-method.html */
  params?: VisitParameters,
  callback?: () => void,
];

export type SetUserIDEventParameters = [eventName: 'setUserID', userID: string];

export type UserParamsEventParameters = [eventName: 'userParams', parameters: UserParameters];

export type EventParameters =
  | InitEventParameters
  | AddFileExtensionEventParameters
  | ExtLinkEventParameters
  | FileEventParameters
  | FirstPartyParamsEventParameters
  | GetClientIDEventParameters
  | HitEventParameters
  | NotBounceEventParameters
  | ParamsEventParameters
  | ReachGoalEventParameters
  | SetUserIDEventParameters
  | UserParamsEventParameters;
