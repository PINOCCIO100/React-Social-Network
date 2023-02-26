import { fetcher } from "./fetcher";

export async function reqAuthStatus() {
  return await fetcher.get('/api/auth/me').then(res => res.data);
}
