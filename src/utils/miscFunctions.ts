import { SpeciesType } from "../api/apiTypes";
import { Reptile } from "../api/models";

export function setTokenToLocalStorage(token: string) {
  localStorage.setItem("token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

const readableSpeciesMap: Record<SpeciesType, string> = {
  ball_python: "Ball Python",
  corn_snake: "Corn Snake",
  redtail_boa: "Redtail Boa",
  king_snake: "King Snake",
};

export function readableSpecies(type: SpeciesType) {
  return readableSpeciesMap[type];
}
