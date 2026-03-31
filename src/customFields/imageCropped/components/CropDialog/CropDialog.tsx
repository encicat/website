import { Button, ButtonGroup } from '@keystar/ui/button';
import { Dialog, DialogContainer } from '@keystar/ui/dialog';
import { Heading } from '@keystar/ui/typography';
import { FC, useRef, useState } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';

import { getCroppedImg } from './helpers/crop';

interface Props {
  value: string;
  onDismiss: () => void;
  onChange: (value: Uint8Array) => void;
}

export const CropDialog: FC<Props> = ({ value, onDismiss, onChange }) => {
  const [crop, setCrop] = useState<Crop>();
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <DialogContainer onDismiss={onDismiss}>
      <Dialog>
        <Heading>Edit item</Heading>

        <div>
          <div className="relative w-full h-[400]">
            <ReactCrop
              crop={crop}
              onChange={(c) => {
                setCrop(c);
              }}
            >
              <img ref={imageRef} src={value} style={{ width: '100%' }} />
            </ReactCrop>
          </div>
        </div>

        <ButtonGroup>
          <Button
            onClick={() => {
              setCrop(undefined);
              onDismiss();
            }}
          >
            Cerrar
          </Button>
          <Button
            prominence="high"
            onClick={async () => {
              const image = imageRef.current as HTMLImageElement;
              const scaleX = image.naturalWidth / image.width;
              const scaleY = image.naturalHeight / image.height;
              if (crop) {
                const croppedImage = await getCroppedImg(value, {
                  x: (crop?.x ?? 0) * scaleX,
                  y: (crop?.y ?? 0) * scaleY,
                  width: (crop?.width ?? 0) * scaleX,
                  height: (crop?.height ?? 0) * scaleY,
                  unit: crop?.unit ?? 'px',
                });
                onChange(croppedImage);
              } else {
                const response = await fetch(value);
                const blob = await response.blob();
                onChange(new Uint8Array(await blob.arrayBuffer()));
              }
              setCrop(undefined);
              onDismiss();
            }}
          >
            Aplicar
          </Button>
        </ButtonGroup>
      </Dialog>
    </DialogContainer>
  );
};
