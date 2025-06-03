import { ApiService, type CreateGistRequest } from '@/core/api';
import { useMutation } from '@tanstack/react-query';

export const useCreateGistMutation = () =>
  useMutation({
    mutationFn: (gist: CreateGistRequest) =>
      ApiService.Gists.create(gist).then(ApiService.handleApiResult),
  });
