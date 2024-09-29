import {
  AddFileExtensionEventParameters,
  EventParameters,
  ExtLinkEventParameters,
  FileEventParameters,
  FirstPartyParamsEventParameters,
  GetClientIDEventParameters,
  HitEventParameters,
  InitEventParameters,
  NotBounceEventParameters,
  ParamsEventParameters,
  ReachGoalEventParameters,
  SetUserIDEventParameters,
  UserParamsEventParameters,
} from './types/events';
import { _YM } from './types/ym';

// Overload signatures for each event type
export function ym(tagID: number | null, ...params: InitEventParameters): void;
export function ym(tagID: number | null, ...params: AddFileExtensionEventParameters): void;
export function ym(tagID: number | null, ...params: ExtLinkEventParameters): void;
export function ym(tagID: number | null, ...params: FileEventParameters): void;
export function ym(tagID: number | null, ...params: FirstPartyParamsEventParameters): void;
export function ym(tagID: number | null, ...params: GetClientIDEventParameters): void;
export function ym(tagID: number | null, ...params: HitEventParameters): void;
export function ym(tagID: number | null, ...params: NotBounceEventParameters): void;
export function ym(tagID: number | null, ...params: ParamsEventParameters): void;
export function ym(tagID: number | null, ...params: ReachGoalEventParameters): void;
export function ym(tagID: number | null, ...params: SetUserIDEventParameters): void;
export function ym(tagID: number | null, ...params: UserParamsEventParameters): void;

// The implementation with a single function definition
export function ym(tagID: number | null, ...parameters: EventParameters): void {
  if (!('ym' in window)) {
    console.error(
      '[next-yandex-metrica] window.ym is not defined. Make sure to use YandexMetricaProvider',
    );
    return;
  }

  const ym = window.ym as _YM | undefined;

  if (!ym || !tagID) {
    return;
  }

  ym(tagID, ...parameters);
}
