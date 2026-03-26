import { produce } from 'immer';

import { prefixIfContent } from './helper';

export const removeAttrs = (
  attrs: Record<string, string | number>,
  forRemove: string[],
) =>
  Object.entries(attrs).reduce(
    (prev, [key, value]) =>
      forRemove.includes(key)
        ? prev
        : produce(prev, (draft) => {
            Object.assign(draft, { [key]: value });
          }),
    {},
  );

export const renderAttrs = (attrs: Record<string, string | number>) =>
  prefixIfContent(
    Object.entries(attrs)
      .map(([key, val]) => `${key}="${val}"`)
      .join(' '),
    ' ',
  );
