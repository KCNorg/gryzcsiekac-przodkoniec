import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Wybierz role:</Text>
        <View style={styles.categories}>
          <Link href="/elderMan" asChild>
            <Pressable style={styles.category}>
              <Image
                source={require("../assets/images/groceries.png")}
                style={styles.icon}
              />
              <Text style={styles.label}>Potrzebujący</Text>
            </Pressable>
          </Link>
          <Link href="/volunteer" asChild>
            <Pressable style={styles.category}>
              <Image
                source={require("../assets/images/dog.png")}
                style={styles.icon}
              />
              <Text style={styles.label}>Wolontariusz</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 96,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  icon: {
    width: 100,
    height: 100,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
    width: "100%",
  },
  category: {
    alignItems: "center",
    width: "40%",
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    textAlign: "center",
  },
});