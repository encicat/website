import * as React from 'react';
import Markdoc, { Node } from '@markdoc/markdoc';

interface Props {
  document: { node: Node };
}

export const DocumentRenderer: React.FC<Props> = ({ document }) => {
  const transformedContent = Markdoc.transform(document.node);

  return (
    <div className="markdoc">
      {Markdoc.renderers.react(transformedContent, React)}
    </div>
  );
};
