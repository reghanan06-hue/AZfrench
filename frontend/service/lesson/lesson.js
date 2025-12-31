
import { useQuery } from "@tanstack/react-query";
import { instance } from "../instance";

// 
export const useGetAllLesson = () => {
  return useQuery({
    queryKey: ["cours"],
    queryFn: async () => {
      try {
        const res = await instance.get("/lesson");
        return res.data;
      } catch (error) {
        throw new Error(error.message || "Failed to fetch cours data");
      }
    },
  });
};

export const useGetLessonById = (id) => {
  return useQuery({
    queryKey: ["lesson", id],
    enabled: !!id, // évite de lancer la requete si pas id
    queryFn: async () => {
      try {
        const res = await instance.get(`/lesson/${id}`);
        return res.data;
      } catch (error) {
        throw new Error(error.message || "Failed to fetch cours details");
      }
    },
  });
};
