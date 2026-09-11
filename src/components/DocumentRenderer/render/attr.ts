import { produce } from 'immer';

import { prefixIfContent } from './helper';

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

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
      .map(([key, val]) => `${key}="${escapeHtml(String(val))}"`)
      .join(' '),
    ' ',
  );
