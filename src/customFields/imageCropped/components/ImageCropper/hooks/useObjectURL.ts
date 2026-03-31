import { useEffect, useState } from 'react';

export function useObjectURL(
  data: Uint8Array | null,
  contentType: string | undefined,
) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (data) {
      const url = URL.createObjectURL(
        new Blob([data as BlobPart], { type: contentType }),
      );
      setUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setUrl(null);
    }
  }, [contentType, data]);
  return url;
}
