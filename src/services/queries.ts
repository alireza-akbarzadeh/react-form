import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Options } from "../types/options.ts";
import { ApiGet } from "../types/api-types.ts";
import { UserSchemaType } from "../schema/users-schema.ts";

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

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", { id }],
    queryFn: async (): Promise<UserSchemaType> => {
      const { data } = await axios.get<ApiGet>(
        `http://localhost:8080/users/${id}`,
      );
      return {
        variant: "edit",
        id: data.id.toString(),
        name: data.name,
        email: data.email,
        formerEmploymentPeriod: [
          new Date(data.formerEmploymentPeriod[0]),
          new Date(data.formerEmploymentPeriod[1]),
        ],
        gender: data.gender,
        languagesSpoken: data.languagesSpoken,
        registrationDateAndTime: new Date(data.registrationDateAndTime),
        salaryRange: [data.salaryRange[0], data.salaryRange[1]],
        skills: data.skills,
        states: data.states,
        students: data.students,
        isTeacher: data.isTeacher,
      };
    },
    enabled: !!id,
  });
}
