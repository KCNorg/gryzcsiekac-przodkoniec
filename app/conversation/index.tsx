import OrderCategoryView from "@/components/OrderCategoryView";
import { Link } from "expo-router";
import { StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  ImageSourcePropType, SafeAreaView } from "react-native";

  export default function Conversation() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chat}>
      <Link href="/conversation/chat" asChild>
        <TouchableOpacity style={styles.button}>
          <Image source={require("../../assets/images/volunteerChat.png")} style={styles.icon} />
          <Text style={styles.text}>Czatuj z wolontariuszem gpt</Text>
        </TouchableOpacity>
      </Link>
      </View>
      <OrderCategoryView
        category="conversation"
        categoryIcon={require("../../assets/images/talk.png")}
        onCreate={() => {}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chat: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 12,
  },
  icon: {
    width: 128,
    height: 128,
  },
  buttons: {
    justifyContent: "space-around",
    marginTop: 12,
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