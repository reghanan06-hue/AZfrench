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

import { useMutation } from "@tanstack/react-query";
import { instance } from "@/service/instance";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data) => {
      try {
        const res = await instance.post("/signup", data);
        return res.data;
      } catch (error) {
        error.response?.data?.message 
        throw new Error(
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Register failed"
        );
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
