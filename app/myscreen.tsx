import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ListBttn = [
  { id: 1, name: "ABCD" },
  { id: 2, name: "123" },
  { id: 3, name: "Word" },
  { id: 4, name: "Color" },
];

export default function myscreen() {
  // Grouper 2 boutons par ligne
  const rows = [];
  for (let i = 0; i < ListBttn.length; i += 2) {
    rows.push(ListBttn.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item) => (
            <TouchableOpacity key={item.id} style={styles.button}>
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>


 

        
       
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    width: "48%", // pour que deux boutons tiennent côte à côte avec un peu d'espace
    height: 100,
    backgroundColor: "#269c90",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
