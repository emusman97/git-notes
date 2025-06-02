import { MainLayout, PageHeadingContainer } from '@/components';
import { AppStrings } from '@/constants';
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
import type { FormFields } from './types';
import { FILENAME_REGEX } from './constants';

export function CreateGistPage(): JSX.Element {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'files',
  });

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files ?? [];
    const file = files[0];

    append({ content: null, file });
  };
  const handleDelete = (index: number) => () => remove(index);
  const handleContentLoad = (index: number) => (content: string) => {
    const updatedInfo = { ...fields[index], content };
    update(index, updatedInfo);
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
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
              key={`${field.file.name}-${index}`}
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
              component="label"
              variant="contained"
              color="primary"
              sx={{ background: grey[200], color: 'primary.main' }}
            >
              {AppStrings.AddFile}
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            <Button type="submit" variant="contained">
              {AppStrings.CreateGist}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </MainLayout>
  );
}
