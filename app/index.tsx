import { Link } from "expo-router";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Wybierz rolę</Text>
        <View style={styles.categories}>
          <Link href="/elder" asChild>
            <TouchableOpacity style={styles.button}>
              <Image
                source={require("../assets/images/elder.png")}
                style={styles.icon}
              />
              <Text style={styles.text}>Potrzebujący</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/volunteer" asChild>
            <TouchableOpacity style={styles.button}>
              <Image
                source={require("../assets/images/volunteer.png")}
                style={styles.icon}
              />
              <Text style={styles.text}>Wolontariusz</Text>
            </TouchableOpacity>
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
  },
  main: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 128,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    width: 128,
    height: 128,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 48,
    gap: 48,
  },
  button: {
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: "600",
  },
});
