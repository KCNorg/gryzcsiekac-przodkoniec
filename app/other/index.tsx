import OrderCategoryView from "@/components/OrderCategoryView";
import { StyleSheet, SafeAreaView } from "react-native";

export default function Other() {
  return (
    <SafeAreaView style={styles.container}>
      <OrderCategoryView
        category="other"
        categoryIcon={require("../../assets/images/other.png")}
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
