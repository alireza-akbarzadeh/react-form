import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Options } from "../types/options.ts";

export function useStates() {
  return useQuery({
    queryFn: () =>
      axios
        .get<Options[]>("http://localhost:8080/states")
        .then((response) => response.data),
    queryKey: ["States"],
  });
}
export function useLanguages() {
  return useQuery({
    queryFn: () =>
      axios
        .get<Options[]>("http://localhost:8080/languages")
        .then((response) => response.data),
    queryKey: ["Languages"],
  });
}
export function useGenders() {
  return useQuery({
    queryFn: () =>
      axios
        .get<Options[]>("http://localhost:8080/genders")
        .then((response) => response.data),
    queryKey: ["States"],
  });
}
export function useSkills() {
  return useQuery({
    queryFn: () =>
      axios
        .get<Options[]>("http://localhost:8080/skills")
        .then((response) => response.data),
    queryKey: ["Skills"],
  });
}
export function useUsers() {
  return useQuery({
    queryFn: () =>
      axios
        .get<Options[]>("http://localhost:8080/users")
        .then((response) => response.data),
    queryKey: ["Users"],
  });
}
