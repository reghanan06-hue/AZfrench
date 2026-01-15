import React from "react";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetCoursById } from "@/service/course/queries";

import AlphabetDesign from "../../components/designs/AlphabetDesign";
import SecondCours from "../../components/designs/SecondCours";
// import ExerciseReading from "../tab/exerciseReading";

export default function CoursScreen() {
  const { id } = useLocalSearchParams();
  const coursId = Number(id);

  const { data, isLoading, isError, error } = useGetCoursById(coursId);

  if (isLoading)
    return (
      <Text style={{ textAlign: "center", marginTop: 50 }}>Loading...</Text>
    );

  if (isError)
    return (
      <Text style={{ color: "red", textAlign: "center", marginTop: 50 }}>
        Erreur: {error?.message || "Erreur inconnue"}
      </Text>
    );

  if (!data)
    return (
      <Text style={{ textAlign: "center", marginTop: 50 }}>
        Aucune donnée trouvée
      </Text>
    );

  // ================= Dynamically render component =================
  const titleLower = data.title.toLowerCase();
  if (titleLower.includes("alphabet")) {
    return <AlphabetDesign data={data} coursId={coursId} />;
  }

  if (titleLower.includes("nombres")) {
    return <AlphabetDesign data={data} coursId={coursId} />;
  }
  if (titleLower.includes("syllabes")) {
    return <AlphabetDesign data={data} coursId={coursId} />;
  }
  if (titleLower.includes("animaux")) {
    return <SecondCours data={data} coursId={coursId} />;
  }
  if (titleLower.includes("fruits")) {
    return <SecondCours data={data} coursId={coursId} />;
  }
  if (titleLower.includes("couleurs")) {
    return (
      <>
        <SecondCours data={data} coursId={coursId} />
        {/* <mycreen /> */}
      </>
    );
  }

  console.log(titleLower);
  return (
    <Text style={{ fontSize: 24, textAlign: "center", marginTop: 50 }}>
      Autre Leçon
    </Text>
  );
}
