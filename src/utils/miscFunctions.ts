export function setTokenToLocalStorage(token: string) {
  localStorage.setItem("token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function dayToUpperCased(day: string) {
  return day.charAt(0).toUpperCase() + day.slice(1);
}