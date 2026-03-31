import type { AssetFormField } from '@keystatic/core';
import { ImageCropper } from './components/ImageCropper';
import { assertRequired } from './helpers/assert';
import { FieldDataError } from './helpers/error';
import { fixPath, getSrcPrefix } from './helpers/path';

export function imageCropped<IsRequired extends boolean | undefined>({
  label,
  directory,
  validation,
  description,
  publicPath,
  transformFilename,
}: {
  label: string;
  directory?: string;
  validation?: { isRequired?: IsRequired };
  description?: string;
  publicPath?: string;
  transformFilename?: (originalFilename: string) => string;
}): AssetFormField<
  { data: Uint8Array; extension: string; filename: string } | null,
  | { data: Uint8Array; extension: string; filename: string }
  | (IsRequired extends true ? never : null),
  string | (IsRequired extends true ? never : null)
> {
  return {
    kind: 'form',
    formKind: 'asset',
    label,
    Input(props) {
      return (
        <ImageCropper
          label={label}
          description={description}
          validation={validation}
          transformFilename={transformFilename}
          {...props}
        />
      );
    },
    defaultValue() {
      return null;
    },
    filename(value, args) {
      if (typeof value === 'string') {
        return value.slice(getSrcPrefix(publicPath, args.slug).length);
      }
      return undefined;
    },

    parse(value, args) {
      if (value === undefined) {
        return null;
      }
      if (typeof value !== 'string') {
        throw new FieldDataError('Must be a string');
      }
      if (args.asset === undefined) {
        return null;
      }
      return {
        data: args.asset,
        filename: value.slice(getSrcPrefix(publicPath, args.slug).length),
        extension: value.match(/\.([^.]+$)/)?.[1] ?? '',
      };
    },
    validate(value) {
      assertRequired(value, validation, label);
      return value;
    },
    serialize(value, args) {
      if (value === null) {
        return { value: undefined, asset: undefined };
      }
      const filename = args.suggestedFilenamePrefix
        ? args.suggestedFilenamePrefix + '.' + value.extension
        : value.filename;
      return {
        value: `${getSrcPrefix(publicPath, args.slug)}${filename}`,
        asset: { filename, content: value.data },
      };
    },
    directory: directory ? fixPath(directory) : undefined,
    reader: {
      parse(value) {
        if (typeof value !== 'string' && value !== undefined) {
          throw new FieldDataError('Must be a string');
        }
        const val = value === undefined ? null : value;
        assertRequired(val, validation, label);
        return val;
      },
    },
  };
}
