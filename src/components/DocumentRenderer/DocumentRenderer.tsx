import * as React from 'react';
import * as Markdoc from '@markdoc/markdoc';

import { render } from './render';

interface Props {
  document: { node: Markdoc.Node };
}

export const DocumentRenderer: React.FC<Props> = ({ document: { node } }) => (
  <div className="markdoc">
    <div dangerouslySetInnerHTML={{ __html: render(node) }} />
  </div>
);
