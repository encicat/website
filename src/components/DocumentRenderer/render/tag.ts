import type { Node } from '@markdoc/markdoc';

import { removeAttrs, renderAttrs } from './attr';

const document = (node: Node): string =>
  `<div class="document">${node.children.map(renderTag).join('')}</div>`;
const text = (node: Node): string => node.attributes.content;
const inline = (node: Node): string => node.children.map(renderTag).join('');
const heading = (node: Node): string =>
  `<h${node.attributes.level}${renderAttrs(removeAttrs(node.attributes, ['level']))}>${node.children.map(renderTag).join('')}</h${node.attributes.level}>`;
const paragraph = (node: Node): string =>
  `<p${renderAttrs(node.attributes)}>${node.children.map(renderTag).join('')}</p>`;
const link = (node: Node): string =>
  `<a${renderAttrs(node.attributes)}${node.attributes.href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${node.children.map(renderTag).join('')}</a>`;
const strong = (node: Node): string =>
  `<strong${renderAttrs(removeAttrs(node.attributes, ['marker']))}>${node.children.map(renderTag).join('')}</strong>`;
const em = (node: Node): string =>
  `<em${renderAttrs(removeAttrs(node.attributes, ['marker']))}>${node.children.map(renderTag).join('')}</em>`;
const list = (node: Node): string =>
  `<${node.attributes.ordered ? 'ol' : 'ul'}${renderAttrs(removeAttrs(node.attributes, ['ordered', 'marker']))}>${node.children.map(renderTag).join('')}</${node.attributes.ordered ? 'ol' : 'ul'}>`;
const item = (node: Node): string =>
  `<li${renderAttrs(node.attributes)}>${node.children.map(renderTag).join('')}</li>`;

const unknown = (node: Node): string =>
  `<div${renderAttrs(node.attributes)}>${node.children.map(renderTag).join('')}</div>`;

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
