import { VisitParameters } from './parameters';

type WithCallback = {
  callback?: () => void;
};

type WithParams = {
  /** Session parameters. @see https://yandex.com/support/metrica/objects/params-method.html */
  params?: VisitParameters;
};

type WithReferer = {
  /** The URL that the user loaded the current page contents from */
  referer?: string;
};

type WithTitle = {
  /** @default document.title */
  title?: string;
};

export interface ExtLinkOptions extends WithCallback, WithParams, WithTitle {}

export interface FileOptions extends WithCallback, WithParams, WithReferer, WithTitle {}

export interface HitOptions extends WithCallback, WithParams, WithReferer, WithTitle {}

export interface NotBounceOptions extends WithCallback {}
