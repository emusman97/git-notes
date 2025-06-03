import { MainLayout, PageHeadingContainer } from '@/components';
import { AppStrings } from '@/constants';
import { useCreateGistMutation, type FilesPayload } from '@/core';
import {
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Stack,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import type { ChangeEventHandler, JSX } from 'react';
import {
  Controller,
  useFieldArray,
  useForm,
  type SubmitHandler,
} from 'react-hook-form';
import { File, VisuallyHiddenInput } from './components';
import { FILENAME_REGEX } from './constants';
import type { FormFields } from './types';
import { useAlertContext } from '@/context';
import { v4 as uuidv4 } from 'uuid';

export function CreateGistPage(): JSX.Element {
  const { showAlert } = useAlertContext();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormFields>();

  const { mutate: createGist, isPending } = useCreateGistMutation();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'files',
  });

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files ?? [];
    const file = files[0];

    if (file) {
      const isDuplicate = fields.some((field) => field.file.name === file.name);

      if (isDuplicate) {
        showAlert(AppStrings.DuplicateFileError, 'error');
        return;
      }

      append({ fileId: `${file.name}-${uuidv4()}`, content: null, file });
      event.target.value = '';
    }
  };
  const handleDelete = (index: number) => () => remove(index);
  const handleContentLoad = (index: number) => (content: string) => {
    const updatedInfo = { ...fields[index], content };
    update(index, updatedInfo);
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (data.description.trim() === '') {
      setError('description', {
        type: 'required',
        message: AppStrings.DescriptionEmpty,
      });
      return;
    }

    if (data.files.length === 0) {
      showAlert(AppStrings.FileIsRequired, 'error');
      return;
    }

    const files = data.files.reduce((filesObj, curr) => {
      const filename = curr.file.name;
      filesObj[filename] = { content: curr.content ?? '' };

      return filesObj;
    }, {} as FilesPayload);
    createGist(
      { description: data.description, files },
      {
        onSuccess() {
          reset({ files: [] });
          showAlert(AppStrings.GistCreated, 'success');
        },
        onError() {
          showAlert(AppStrings.CreateGistError, 'error');
        },
      }
    );
  };

  return (
    <MainLayout>
      <PageHeadingContainer title={AppStrings.CreateGist} />

      <Stack width="100%" alignItems="center">
        <Stack component={'form'} width="50%" onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <OutlinedInput
              placeholder={AppStrings.GistDescription}
              error={!!errors.description}
              {...register('description', {
                required: {
                  value: true,
                  message: AppStrings.DescriptionEmpty,
                },
              })}
            />
            {!!errors.description && (
              <FormHelperText error={!!errors.description}>
                {errors.description.message}
              </FormHelperText>
            )}
          </FormControl>

          {fields.map((field, index) => (
            <Controller
              key={field.fileId}
              control={control}
              name={`files.${index}`}
              rules={{
                validate: (value) =>
                  FILENAME_REGEX.test(value.file.name)
                    ? true
                    : AppStrings.InvalidFilename,
              }}
              render={({ fieldState: { error } }) => (
                <File
                  data={field}
                  fieldError={error}
                  onDeleteClick={handleDelete(index)}
                  onContentLoad={handleContentLoad(index)}
                />
              )}
            />
          ))}

          <Stack
            mt={2}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              disabled={isPending}
              component="label"
              variant="contained"
              color="primary"
              sx={{ background: grey[200], color: 'primary.main' }}
            >
              {AppStrings.AddFile}
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            <Button loading={isPending} type="submit" variant="contained">
              {AppStrings.CreateGist}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </MainLayout>
  );
}
