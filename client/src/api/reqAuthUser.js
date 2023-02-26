import { fetcher } from "./fetcher";
// import bcryptjs from 'bcryptjs'

export async function reqAuthUser({ email, password }) {
  return await fetcher.post('/api/auth', { email, password }).then(res => res.data)
}