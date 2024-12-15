import OrderCategoryView from "@/components/OrderCategoryView";
import { StyleSheet, SafeAreaView } from "react-native";

export default function PetWalking() {
  return (
    <SafeAreaView style={styles.container}>
      <OrderCategoryView
        category="pet_walking"
        categoryIcon={require("../../assets/images/dog.png")}
        onCreate={() => {}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
