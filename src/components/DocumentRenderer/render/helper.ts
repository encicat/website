export const prefixIfContent = (content: string, prefix = ' ') =>
  content && content !== '' ? `${prefix}${content}` : content;
