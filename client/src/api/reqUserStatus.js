import { fetcher } from './fetcher';

export async function reqUserStatus(userID) {
  return await fetcher.get(`/api/status/${userID}`).then(res => res.data);
}

export async function reqCreateStatus(text) {
  return await fetcher.post(`/api/status`, {text}).then(res => res.data);
}