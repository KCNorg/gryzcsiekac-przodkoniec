import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Ktoś dla Ciebie</Text>
        {/* <Text style={styles.subtitle}>Wybierz kategorię</Text> */}
        <View style={styles.categories}>
          <Link href="/groceries" asChild>
            <Pressable>
              <Image
                source={require("../assets/images/groceries.png")}
                style={styles.icon}
              />
            </Pressable>
          </Link>
          <Link href="/groceries" asChild>
            <Pressable>
              <Image
                source={require("../assets/images/dog.png")}
                style={styles.icon}
              />
            </Pressable>
          </Link>
        </View>
        <View style={styles.categories}>
          <Link href="/groceries" asChild>
            <Pressable>
              <Image
                source={require("../assets/images/talk.png")}
                style={styles.icon}
              />
            </Pressable>
          </Link>
          <Link href="/groceries" asChild>
            <Pressable>
              <Image
                source={require("../assets/images/other.png")}
                style={styles.icon}
              />
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
  },
  main: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 96,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    color: "#38434D",
  },
  icon: {
    width: 128,
    height: 128,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 48,
    gap: 32,
  },
});
