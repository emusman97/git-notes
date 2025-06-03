import { ApiService, type StarOperation } from '@/core/api';
import type { GistId } from '@/models';
import { useMutation } from '@tanstack/react-query';

export const useStarUnstarMutation = (id: GistId) =>
  useMutation({
    mutationFn: (op: StarOperation) =>
      (op === 'star'
        ? ApiService.Gists.star(id)
        : ApiService.Gists.unStar(id)
      ).then(ApiService.handleApiResult),
  });
