import axios from "axios";
import store from "../store";
import { handleLogout } from "../store/reducers/authReducer";
// создаю кастомный обработчик HTTP-запросов. В baseURL закидываю IP сервера
export const fetcher = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})


// Интерсептер для axios запросов. Можно обрабатывать все запросы/ответы

fetcher.interceptors.response.use((res) => {
  // Any status code that lie within the range of 2xx cause this function to trigger

  // Если статус == 299 (клиент не авторизован / сессия просрочена), то любой запрос на сервер вызывает logout
  if (res.status === 299) {
    store.dispatch(handleLogout())
  }
  return res
},
  (e) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(e)
  })