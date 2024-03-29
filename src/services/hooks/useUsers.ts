import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { api } from '../api';

type Users = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  totalCount: number;
  users: Users[];
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('users', { params: { page } });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  return { users, totalCount };
}

export function useUsers(page: number, options?: UseQueryOptions) {
  // Important: if the key forneced would be used in a different query,
  // likely a pagination (lots of page with different results), you MUST
  // consider setting a second key so useQuery will not use the same result for
  // every page.
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  }) as UseQueryResult<GetUsersResponse, unknown>;
}
