import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import Onboarding from "./screens/welcome/onboarding/Onboarding";
import OnboardingConfig from "./screens/welcome/onboarding/OnboardingConfig";
import DynamicAppStyles from "./screens/welcome/onboarding/DynamicAppStyles";

export default function App() {
  return (
    // <View style={styles.container}>
    <Onboarding appConfig={OnboardingConfig} appStyles={DynamicAppStyles} />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
