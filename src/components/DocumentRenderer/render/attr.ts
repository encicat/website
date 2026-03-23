export const removeAttrs = (attrs: Record<string, any>, forRemove: string[]) =>
  Object.entries(attrs).reduce(
    (prev, curr) =>
      forRemove.includes(curr[0]) ? prev : { ...prev, [curr[0]]: curr[1] },
    {},
  );

export const renderAttrs = (attrs: Record<string, any>) =>
  Object.entries(attrs)
    .map(([key, val]) => `${key}="${val}"`)
    .join(' ');
