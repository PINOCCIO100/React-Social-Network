import { fetcher } from "./fetcher";

export async function reqUserDialog(accepterID) {
  return fetcher.get(`/api/messages/${accepterID}`).then(res => res.data)
}

export async function reqUserSendedMessages() {
  return fetcher.get(`/api/messages`).then(res => res.data)
}

export async function reqUsersIDWithDialogs() {
  return fetcher.get(`/api/messages/users`).then(res => res.data)
}

export async function reqSendMessage(accepterID, text) {
  return fetcher.post(`/api/messages/send`, {
    accepterID,
    message: text,
  }).then(res => res.data)
}