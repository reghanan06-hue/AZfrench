// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// const ListBttn = [
//   { id: 1, name: "ABCD" },
//   { id: 2, name: "123" },
//   { id: 3, name: "Word" },
//   { id: 4, name: "Color" },
// ];

// export default function myscreen() {
//   // Grouper 2 boutons par ligne
//   const rows = [];
//   for (let i = 0; i < ListBttn.length; i += 2) {
//     rows.push(ListBttn.slice(i, i + 2));
//   }

//   return (
//     <View style={styles.container}>
//       {rows.map((row, rowIndex) => (
//         <View key={rowIndex} style={styles.row}>
//           {row.map((item) => (
//             <TouchableOpacity key={item.id} style={styles.button}>
//               <Text style={styles.text}>{item.name}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       ))}
//     </View>

//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   button: {
//     width: "48%", // pour que deux boutons tiennent côte à côte avec un peu d'espace
//     height: 100,
//     backgroundColor: "#269c90",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });
import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetCoursById } from "@/service/course/queries";
import { StatusBar } from "react-native";

export default function exp() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const coursId = Number(id);

  const { data, isLoading, isError, error } = useGetCoursById(coursId);
  console.log(coursId);
  if (isLoading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff6b6b" />
      </View>
    );

  if (isError)
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Error: {error.message}</Text>
      </View>
    );

  if (!data)
    return (
      <View style={styles.center}>
        <Text>Aucun lessons trouvé</Text>
      </View>
    );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#ffffffff" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Text style={styles.sectionTitle}>The alphabet</Text>

        {data.lecon && data.lecon.length > 0 ? (
          data.lecon.map((event: any) => (
            <View key={event.id} style={styles.detailEvent}>
              <Text style={styles.eventTitle}>{event.name_lesson}</Text>

              <TouchableOpacity
                style={styles.button}
                // onPress={() => handleReservation(lecon)}
              >
                <Text style={styles.buttonText}>read</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.card}>
            <Text style={styles.name}>No lesson found</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff6b6b",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#ffffff",
    padding: 20,
    marginHorizontal: "5%",
    marginBottom: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 340,
    borderRadius: 12,
    marginBottom: 12,
  },
  Textname: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "center",
  },
  detailEvent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: "5%",
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  eventText: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#ff6b6b",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
