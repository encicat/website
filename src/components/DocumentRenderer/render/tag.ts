import type { Node } from '@markdoc/markdoc';

import { escapeHtml, removeAttrs, renderAttrs } from './attr';

const renderChildren = (node: Node): string =>
  node.children.map(renderTag).join('');

const document = (node: Node): string =>
  `<div class="document">${renderChildren(node)}</div>`;
const text = (node: Node): string => escapeHtml(node.attributes.content);
const inline = (node: Node): string => renderChildren(node);
const heading = (node: Node): string => {
  const level = Math.min(Math.max(Number(node.attributes.level) || 2, 1), 6);
  return `<h${level}${renderAttrs(removeAttrs(node.attributes, ['level']))}>${renderChildren(node)}</h${level}>`;
};
const paragraph = (node: Node): string =>
  `<p${renderAttrs(node.attributes)}>${renderChildren(node)}</p>`;
const isSafeUrl = (href: string) => /^(https?:|mailto:|tel:|\/|#)/i.test(href);
const link = (node: Node): string => {
  const href = node.attributes.href;
  const children = renderChildren(node);
  if (typeof href !== 'string' || !isSafeUrl(href)) {
    return children;
  }
  return `<a${renderAttrs(node.attributes)}${href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${children}</a>`;
};
const strong = (node: Node): string =>
  `<strong${renderAttrs(removeAttrs(node.attributes, ['marker']))}>${renderChildren(node)}</strong>`;
const em = (node: Node): string =>
  `<em${renderAttrs(removeAttrs(node.attributes, ['marker']))}>${renderChildren(node)}</em>`;
const list = (node: Node): string =>
  `<${node.attributes.ordered ? 'ol' : 'ul'}${renderAttrs(removeAttrs(node.attributes, ['ordered', 'marker']))}>${renderChildren(node)}</${node.attributes.ordered ? 'ol' : 'ul'}>`;
const item = (node: Node): string =>
  `<li${renderAttrs(node.attributes)}>${renderChildren(node)}</li>`;
const blockquote = (node: Node): string =>
  `<blockquote${renderAttrs(node.attributes)}>${renderChildren(node)}</blockquote>`;
const code = (node: Node): string =>
  `<code>${escapeHtml(node.attributes.content)}</code>`;
const fence = (node: Node): string =>
  `<pre><code>${escapeHtml(node.attributes.content)}</code></pre>`;
const softbreak = (_node: Node): string => ' ';
const hardbreak = (_node: Node): string => '<br />';

const unknown = (node: Node): string =>
  `<div${renderAttrs(node.attributes)}>${renderChildren(node)}</div>`;

const tagFnMap = {
  document,
  text,
  inline,
  heading,
  paragraph,
  link,
  strong,
  em,
  list,
  item,
  blockquote,
  code,
  fence,
  softbreak,
  hardbreak,
};

const isKeyOfTagFnMap = (key: string): key is keyof typeof tagFnMap => {
  return key in tagFnMap;
};

const getTagFn = (type: string) => {
  if (isKeyOfTagFnMap(type)) {
    return tagFnMap[type];
  }
  return unknown;
};

export const renderTag = (node: Node): string => {
  return getTagFn(node.type)(node);
};
