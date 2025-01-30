import z from "zod";
// export type Users = {
//   [id: string]: string;
// };

export type setMap<T> = {
  [id: string]: Set<T>;
};

export type Code = {
  [id: string]: string;
};

export const messageSchema = z.object({});
