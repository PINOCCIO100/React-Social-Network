import { fetcher } from "./fetcher";
// import bcryptjs from 'bcryptjs'

export async function reqAuthUser({ email, password, rememberMe }) {
  return await fetcher.post('/api/auth', { email, password, rememberMe }).then(res => res.data)
}