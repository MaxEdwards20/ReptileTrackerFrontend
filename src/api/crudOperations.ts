const baseUrl = "http://localhost:3000";

const headers = {
  "Content-Type": "application/json",
};

export function postReq(body: any, path: string) {
  return fetch(`${baseUrl}/${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function getReq(path: string) {
  return fetch(`${baseUrl}/${path}`, {
    method: "GET",
    headers,
  }).then((res) => res.json());
}
