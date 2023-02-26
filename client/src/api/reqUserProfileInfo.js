import { fetcher } from "./fetcher";

export async function reqUserProfileInfo(userID) {
  return await fetcher.get(`/api/users/${userID}`).then(res => res.data);
}