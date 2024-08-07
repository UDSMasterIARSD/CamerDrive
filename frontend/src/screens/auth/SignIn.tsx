import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { withExpoSnack } from "nativewind";
import React, { useState } from "react";
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
  const navigation = useNavigation<NavigationProp<any>>();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { onLogin } = useAuth();

  const handleLogin = async () => {
    setValidationError(null);
    setLoginError(null);

    if (!name) {
      setValidationError("Le nom d'utilisateur est requis.");
      return;
    }
    if (!password) {
      setValidationError("Le mot de passe est requis.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await onLogin!(name, password);
      console.log("Login result:", result);

      if (result && !result.success) {
        setLoginError(result.error);
      } else {
        setLoginError(null);
        // Navigation vers l'écran suivant en cas de succès
        navigation.navigate("HomeScreen" as never);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>
          <Image
            source={require("./../../../assets/auth/loginImg.png")}
            style={{ width: 300, height: 200 }}
          />
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
            Connexion
          </Text>
        </View>
        <View style={styles.informationView}>
          <View>
            {loginError && <Text style={styles.errorText}>{loginError}</Text>}
            <Text style={styles.textInfo}>Nom d'utilisateur:</Text>

            <TextInput
              style={styles.textInput}
              value={name}
              placeholder="Entrer votre nom d'utilisateur..."
              placeholderTextColor="#fff"
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View>
            <Text style={styles.textInfo}>Mot de passe:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={{ color: "#fff", fontSize: 16, marginLeft: 15 }}
                placeholder="Entrer votre mot de passe..."
                placeholderTextColor="#fff"
                value={password}
                onChangeText={(text) => setPassword(text)}
                keyboardType="default"
                textContentType="password"
                secureTextEntry={!showPassword}
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
                  Se connecter
                </Text>
              )}
            </Pressable>
          </View>

          <View
            style={{
              height: 40,
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
                Pas de compte? S'enregistrer
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
            Ou, se connecter avec ...
          </Text>
        </View>

        <View style={styles.imageContainer} className="mt-16">
          <TouchableOpacity onPress={() => { }}>
            <Image
              source={require("./../../../assets/auth/icons8-google-logo-96.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <Image
              source={require("./../../../assets/auth/icons8-facebook-logo-96.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
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
    height: 150,
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
    marginLeft: 15,
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
    marginVertical: 5,
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
