import { useMutation, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance } from "../instance";

/**
 * Hook for updating an existing course
 */
export const useUpdateCours = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("Non authentifié");
      }

      const res = await instance.put(`/cours/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      // Invalidate cours queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["cours"] });
    },
  });
};

/**
 * Hook for deleting a course
 */
export const useDeleteCours = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("Non authentifié");
      }

      const res = await instance.delete(`/cours/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      // Invalidate cours queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["cours"] });
    },
  });
};

/**
 * Hook for creating a new course
 */
export const useCreateCours = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("Non authentifié");
      }

      const res = await instance.post("/cours", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cours"] });
    },
  });
};
