// // import { useMutation } from "@tanstack/react-query";
// // import { instance } from "@/service/instance"; 

// // type RegisterPayload = {
// //   nameUser: string;
// //   email: string;
// //   password: string;
// //   Genre: string;
// // };

// // export const useRegister = () => {
// //   return useMutation({
// //     mutationFn: async (data: RegisterPayload) => {
// //       try {
// //         const res = await instance.post("/register", data);
// //         return res.data;
// //       } catch (error: any) {
// //         throw new Error(error?.response?.data?.message || "Register failed");
// //       }
// //     },
// //   });
// // };

// import { useMutation } from "@tanstack/react-query";
// import { instance } from "@/service/instance";

// type RegisterPayload = {
//   nameUser: string;
//   email: string;
//   password: string;
//   Genre: string;
// };

// type RegisterResponse = {
//   message: string;
//   user: {
//     nameUser: string;
//     email: string;
//     Genre: string;
//   };
// };

// export const useRegister = () => {
//   return useMutation<RegisterResponse, Error, RegisterPayload>({
//     mutationFn: async (data) => {
//       const res = await instance.post("/register", data);
//       return res.data;
//     },
//   });
// };

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { instance } from "@/service/instance";
import axios from "axios";

type RegisterData = {
  nameUser: string;
  email: string;
  password: string;
  Genre: "fille" | "garçon";
};

// Define the type of the response returned by your backend
type RegisterResponse = {
  message: string;
  userId?: string;
};

export const useRegister = (): UseMutationResult<
  RegisterResponse, // data returned on success
  Error,            // error type
  RegisterData,     // variables type (what mutate expects)
  unknown           // context (optional, rarely used)
> => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      try {
        const res = await instance.post<RegisterResponse>("auth/signup", data);
        return res.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            (error.response?.data as any)?.message || "Register failed"
          );
        }
        throw new Error("Register failed");
      }
    },
  });
};


// import { useMutation } from "@tanstack/react-query";
// import { instance } from "@/service/instance";

// interface RegisterPayload {
//   nameUser: string;
//   email: string;
//   password: string;
//   Genre: "fille" | "garçon";
// }

// interface RegisterResponse {
//   message: string;
//   userId: number;
// }
// export const useRegister = () => {
//   return useMutation<RegisterResponse, Error, RegisterPayload>({
//     mutationFn: async (data: RegisterPayload) => {
//       const res = await instance.post("/signup", data);

//       return res.data;
//     },
//   });
// };
