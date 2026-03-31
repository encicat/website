export function getUploadedFileObject(
  accept: string,
): Promise<File | undefined> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    input.accept = accept;
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        resolve(file);
      }
    };
    document.body.appendChild(input);
    input.click();
  });
}

export async function getUploadedFile(
  accept: string,
): Promise<{ content: Uint8Array; filename: string; file: File } | undefined> {
  const file = await getUploadedFileObject(accept);
  if (!file) return undefined;
  return {
    content: new Uint8Array(await file.arrayBuffer()),
    filename: file.name,
    file,
  };
}

export function getUploadedImage(): Promise<
  { content: Uint8Array; filename: string; file: File } | undefined
> {
  return getUploadedFile('image/*');
}
