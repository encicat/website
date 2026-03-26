import type { Node } from '@markdoc/markdoc';
import type { FC } from 'react';

import { render } from './render';

interface Props {
  document: { node: Node };
}

export const DocumentRenderer: FC<Props> = ({ document: { node } }) => (
  <div className="markdoc">
    {/* biome-ignore lint/security/noDangerouslySetInnerHtml: This is a
    controlled parser for markdoc so there is no problem to use here */}
    <div dangerouslySetInnerHTML={{ __html: render(node) }} />
  </div>
);
