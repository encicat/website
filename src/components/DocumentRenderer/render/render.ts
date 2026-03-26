import type { Node } from '@markdoc/markdoc';

import { renderTag } from './tag';

export const render = (node: Node): string => renderTag(node);
