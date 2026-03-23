import * as Markdoc from '@markdoc/markdoc';

import { renderTag } from './tag';

export const render = (node: Markdoc.Node): string => renderTag(node);
