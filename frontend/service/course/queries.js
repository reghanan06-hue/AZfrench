
import { useQuery } from "@tanstack/react-query";
import { instance } from "../instance";

// GET all artists
export const useGetAllCours = () => {
  return useQuery({
    queryKey: ["cours"],
    queryFn: async () => {
      try {
        const res = await instance.get("/cours");
        return res.data;
      } catch (error) {
        throw new Error(error.message || "Failed to fetch cours data");
      }
    },
  });
};

export const useGetCoursById = (id) => {
  return useQuery({
    queryKey: ["cours", id],
    enabled: !!id, // évite de lancer la requete si pas id
    queryFn: async () => {
      try {
        const res = await instance.get(`/cours/${id}`);
        return res.data;
      } catch (error) {
        throw new Error(error.message || "Failed to fetch cours details");
      }
    },
  });
};
