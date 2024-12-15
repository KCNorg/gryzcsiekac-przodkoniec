import { Link } from "expo-router";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function ElderView() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Ktoś dla Ciebie</Text>
        <View style={styles.categories}>
          <Link href="/groceries" asChild>
            <TouchableOpacity style={styles.button}>
              <Image
                source={require("../assets/images/groceries.png")}
                style={styles.icon}
              />
              <Text style={styles.text}>Zakupy</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/conversation" asChild>
            <TouchableOpacity style={styles.button}>
              <Image
                source={require("../assets/images/talk.png")}
                style={styles.icon}
              />
              <Text style={styles.text}>Rozmowa</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.categories}>
          <Link href="/pet_walking" asChild>
            <TouchableOpacity style={styles.button}>
              <Image
                source={require("../assets/images/dog.png")}
                style={styles.icon}
              />
              <Text style={styles.text}>Zwierzęta</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/other" asChild>
            <TouchableOpacity style={styles.button}>
              <Image
                source={require("../assets/images/other.png")}
                style={styles.icon}
              />
              <Text style={styles.text}>Coś innego</Text>
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
