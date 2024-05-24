import { Ionicons } from "@expo/vector-icons"; // Assurez-vous d'avoir installé @expo/vector-icons
import { useNavigation } from "@react-navigation/native";
import { withExpoSnack } from "nativewind";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Nouvel état pour gérer la visibilité du mot de passe
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null); // État pour les erreurs de validation

  const { onLogin } = useAuth();

  const handleLogin = async () => {
    // Réinitialiser les erreurs
    setValidationError(null);
    setLoginError(null);

    // Vérifier si les champs sont vides
    if (!name) {
      setValidationError("Username is required.");
      return;
    }
    if (!password) {
      setValidationError("Password is required.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await onLogin!(name, password);
      console.log("Login result:", result);

      if (result && result.error) {
        setLoginError("Invalid username or password.");
      } else {
        setLoginError(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("./../../../assets/auth/loginImg.png")}
            style={{ width: 300, height: 200 }}
          />
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
            Login Screen
          </Text>
        </View>
        <View style={styles.informationView}>
          <View>
            <Text style={styles.textInfo}>Username:</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              placeholder="Enter your username here ..."
              placeholderTextColor="#fff"
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View>
            <Text style={styles.textInfo}>Password:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={{ color: "#fff", fontSize: 16 }}
                placeholder="Enter your password here ..."
                placeholderTextColor="#fff"
                value={password}
                onChangeText={(text) => setPassword(text)}
                keyboardType="default"
                textContentType="password"
                secureTextEntry={!showPassword} // Utilisez l'état pour gérer la visibilité du mot de passe
                maxLength={20}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            {loginError && <Text style={styles.errorText}>{loginError}</Text>}
            {validationError && (
              <Text style={styles.errorText}>{validationError}</Text>
            )}
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 80,
              position: "relative",
              padding: 30,
            }}
          >
            <Pressable style={styles.pressable} onPress={handleLogin}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 21,
                    fontWeight: "bold",
                    letterSpacing: 0.25,
                    color: "white",
                  }}
                >
                  Login
                </Text>
              )}
            </Pressable>
          </View>
          <View
            style={{
              height: 20,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp", { screen: "SignUp" });
              }}
            >
              <Text style={styles.textSignUp}>
                Don't have an account? SignUp
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              textAlign: "center",
              marginBottom: 30,
              color: "#fff",
              fontSize: 16,
            }}
          >
            Or, login with ...
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require("./../../../assets/auth/icons8-google-logo-96.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require("./../../../assets/auth/icons8-facebook-logo-96.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require("./../../../assets/auth/icons8-linkedin-logo-96.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default withExpoSnack(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C202F",
  },
  image: {
    width: 40,
    height: 40,
    marginTop: 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    height: 80,
    width: "auto",
    marginHorizontal: 25,
    paddingTop: 40,
    marginBottom: 80,
  },
  informationView: {
    opacity: 0.9,
    flexDirection: "column",
    margin: 20,
    height: 330,
    borderRadius: 20,
    padding: 8,
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    height: 50,
    width: 320,
    borderRadius: 40,
    elevation: 3,
    backgroundColor: "#3AAF9F",
  },
  textInput: {
    height: 65,
    margin: 12,
    borderWidth: 3,
    borderColor: "#3AAF9F",
    color: "#fff",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#1C202F",
    fontSize: 16,
  },
  textInfo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
  },
  textSignUp: {
    textAlign: "right",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 65,
    margin: 12,
    borderWidth: 3,
    borderColor: "#3AAF9F",
    color: "#fff",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#1C202F",
  },
  eyeIcon: {},
});
