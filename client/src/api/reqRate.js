import { fetcher } from "./fetcher";

export async function reqRate(objID, rating, objType) {
  return await fetcher.post('/api/rate', { objID, rating, objType }).then(res => res.data);
}

export async function reqVotes(objID) {
  return await fetcher.post('/api/rate/votes', { objID }).then(res => res.data);
}

export async function reqMyVote(objID) {
  return await fetcher.post('/api/rate/votes/my', { objID }).then(res => res.data);
}
