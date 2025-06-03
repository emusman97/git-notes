import { ApiService } from '@/core/api';
import type { GistId } from '@/models';
import { useMutation } from '@tanstack/react-query';

export const useForkMutation = (id: GistId) =>
  useMutation({
    mutationFn: () =>
      ApiService.Gists.fork(id).then(ApiService.handleApiResult),
  });
