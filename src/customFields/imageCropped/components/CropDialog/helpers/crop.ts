import type { Crop } from 'react-image-crop';

export const getCroppedImg = (
  imageSrc: string,
  crop: Crop,
): Promise<Uint8Array> => {
  const canvas = new OffscreenCanvas(crop.width, crop.height);
  const ctx = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;

  const image = new Image();

  return new Promise((resolve, reject) => {
    image.onload = () => {
      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height,
      );
      canvas
        .convertToBlob({ type: 'image/png' })
        .then((blob) => blob.arrayBuffer())
        .then((buffer) => resolve(new Uint8Array(buffer)))
        .catch(reject);
    };
    image.onerror = reject;
    image.src = imageSrc;
  });
};
