import { fetcher } from "./fetcher";

export async function reqFollowStatus(userID) {
  return await fetcher.get(`/api/follow/${userID}`).then(res => res.data)
}

export async function reqToggleFollowUser(userID, isFollow) {
  return isFollow ?
    await fetcher.post(`/api/follow/${userID}`).then(res => res.data) :
    await fetcher.delete(`/api/follow/${userID}`).then(res => res.data)
}