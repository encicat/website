import { createContext, useContext } from 'react';

const IsInEditorContext = createContext(false);

export function useIsInDocumentEditor() {
  return useContext(IsInEditorContext);
}
