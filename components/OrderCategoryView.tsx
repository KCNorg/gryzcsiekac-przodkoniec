import { Link } from "expo-router";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  ImageSourcePropType,
} from "react-native";

type OrderCategoryViewProps = {
  category: "groceries" | "conversation" | "pet_walking" | "other";
  categoryIcon: ImageSourcePropType;
  onCreate: () => void;
};

export default function OrderCategoryView({
  category,
  categoryIcon,
  onCreate,
}: OrderCategoryViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onCreate}>
          <Image source={categoryIcon} style={styles.icon} />
          <Text style={styles.text}>Dodaj nowe zgłoszenie</Text>
        </TouchableOpacity>
        <Link href={`/${category}/list`} asChild>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require("../assets/images/list.png")}
              style={styles.icon}
            />
            <Text style={styles.text}>Wyświetl historię zgłoszeń</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 128,
  },
  icon: {
    width: 128,
    height: 128,
  },
  buttons: {
    justifyContent: "space-around",
    marginTop: 48,
    gap: 64,
  },
  button: {
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginTop: 16,
    fontWeight: "600",
  },
});
