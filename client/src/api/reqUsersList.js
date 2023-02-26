import { fetcher } from './fetcher';

export async function reqUsersList(count, page) {
  return await fetcher.get(`/api/users?count=${count}&page=${page}`).then(res => res.data);
}