'use client';

import { ActionButton, ButtonGroup } from '@keystar/ui/button';
import { FieldDescription, FieldLabel, FieldMessage } from '@keystar/ui/field';
import { Box, Flex } from '@keystar/ui/layout';
import { tokenSchema } from '@keystar/ui/style';
import { TextField } from '@keystar/ui/text-field';
import { FC, useId, useReducer, useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';

import { CropDialog } from '../CropDialog';
import { getUploadedImage } from './helpers/upload';
import { useIsInDocumentEditor } from './hooks/useIsInDocumentEditor';
import { useObjectURL } from './hooks/useObjectURL';

type Value = {
  data: Uint8Array;
  extension: string;
  filename: string;
} | null;

interface Props {
  value: Value;
  onChange(value: Value): void;
  label: string;
  description: string | undefined;
  validation: { isRequired?: boolean } | undefined;
  transformFilename: ((originalFile: string) => string) | undefined;
  forceValidation: boolean;
}

export const ImageCropper: FC<Props> = ({
  onChange,
  value,
  label,
  description,
  validation,
  transformFilename,
  forceValidation,
}) => {
  const [blurred, onBlur] = useReducer(() => true, false);
  const isInEditor = useIsInDocumentEditor();
  const objectUrl = useObjectURL(
    value === null ? null : value.data,
    value?.extension === 'svg' ? 'image/svg+xml' : undefined,
  );
  const [image, setImage] = useState<{
    imageSrc: string;
    extension: string;
    filename: string;
  }>();

  const labelId = useId();
  const descriptionId = useId();

  return (
    <>
      <Flex
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={labelId}
        direction="column"
        gap="medium"
        role="group"
      >
        <FieldLabel
          id={labelId}
          elementType="span"
          isRequired={validation?.isRequired}
        >
          {label}
        </FieldLabel>
        {description && (
          <FieldDescription id={descriptionId}>{description}</FieldDescription>
        )}

        <ButtonGroup>
          <ActionButton
            onPress={async () => {
              const image = await getUploadedImage();
              if (image) {
                const extension = image.filename.match(/\.([^.]+$)/)?.[1];
                if (extension) {
                  const reader = new FileReader();
                  reader.addEventListener('load', () => {
                    setImage({
                      imageSrc: reader.result?.toString() || '',
                      extension,
                      filename: transformFilename
                        ? transformFilename(image.filename)
                        : image.filename,
                    });
                  });
                  reader.readAsDataURL(image.file);
                }
              }
            }}
          >
            Choose file
          </ActionButton>
          {value !== null && (
            <ActionButton
              prominence="low"
              onPress={() => {
                onChange(null);
                onBlur();
              }}
            >
              Remove
            </ActionButton>
          )}
        </ButtonGroup>

        {objectUrl && (
          <Box
            alignSelf="start"
            backgroundColor="canvas"
            borderRadius="regular"
            border="neutral"
            padding="regular"
          >
            <img
              src={objectUrl}
              alt=""
              style={{
                display: 'block',
                maxHeight: tokenSchema.size.alias.singleLineWidth,
                maxWidth: '100%',
              }}
            />
          </Box>
        )}

        {isInEditor && value !== null && (
          <TextField
            label="Filename"
            onChange={(filename) => {
              onChange({ ...value, filename });
            }}
            value={value.filename}
          />
        )}
        {(forceValidation || blurred) &&
          validation?.isRequired &&
          value === null && <FieldMessage>{label} is required</FieldMessage>}
      </Flex>
      {image?.imageSrc && (
        <CropDialog
          value={image?.imageSrc}
          onChange={(imageCropped) => {
            const newValue = {
              data: imageCropped,
              extension: image?.extension ?? '',
              filename: image?.filename ?? '',
            };
            onChange(newValue);
          }}
          onDismiss={() => {
            setImage(undefined);
          }}
        />
      )}
    </>
  );
};
