import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //const [showPassword, setShowPassword] = useState(false);
  //const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false); // State for showing the loading indicator
  const { onRegister } = useAuth();

  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      setIsLoading(true); // Start loading

      const result = await onRegister!(name, email, password);

      if (result && result.error) {
        alert(result.message + result.error);
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView style={{ marginTop: 30 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("./../../../assets/auth/createAccount.png")}
            style={styles.Image}
          ></Image>
          <Text style={styles.createAccountText}>Create my Account</Text>
        </View>
        <View style={styles.Informationview}>
          <View>
            <Text style={styles.Text}>Username:</Text>
            <TextInput
              style={styles.TextInput}
              value={name}
              placeholder="Enter your username address here ..."
              placeholderTextColor="#fff"
              //keyboardType="email-address"
              //textContentType="emailAddress"
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View>
            <Text style={styles.Text}>Email:</Text>
            <TextInput
              style={styles.TextInput}
              value={email}
              placeholder="Enter your email address here ..."
              placeholderTextColor="#fff"
              //keyboardType="email-address"
              //textContentType="emailAddress"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View>
            <Text style={styles.Text}>Date de Naissance :</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter your email address here ..."
              placeholderTextColor="#fff"
              //keyboardType="email-address"
              //textContentType="emailAddress"
            />
          </View>
          <View>
            <Text style={styles.Text}>Password:</Text>
            <TextInput
              style={styles.TextInput}
              value={password}
              placeholder="Enter your password here ..."
              placeholderTextColor="#fff"
              keyboardType="default"
              textContentType="password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              maxLength={20}
            />
          </View>
          <View>
            <Text style={styles.Text}>Confirm Password :</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm your password here ..."
              placeholderTextColor="#fff"
              keyboardType="default"
              textContentType="password"
              secureTextEntry={true}
              maxLength={20}
            />
          </View>
        </View>
        <View style={styles.ViewPressable}>
          <Pressable style={styles.Pressable} onPress={handleRegister}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.TextRegister}>Register</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    //justifyContent: "start",
    //alignItems: "start",
    backgroundColor: "#1C202F",
  },
  Pressable: {
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
  ViewPressable: {
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    position: "relative",
    padding: 30,
  },
  TextRegister: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  Informationview: {
    // backgroundColor: "#FFF1FE",
    opacity: 0.9,
    flexDirection: "column",
    margin: 20,
    height: 330,
    borderRadius: 20,
    //justifyContent: "start",
    padding: 1,
    marginBottom: 220,
  },
  Text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
  },
  TextInput: {
    height: 65,
    margin: 12,
    borderWidth: 3,
    borderColor: "#3AAF9F",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#1C202F",
    color: "#fff",
    fontSize: 16,
  },
  Image: {
    width: 300,
    height: 200,
  },
  createAccountText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
});
