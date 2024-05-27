import React, { useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Dimensions,
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

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false); // State for showing the loading indicator
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false); //
  const { onRegister } = useAuth();

  const [errors, setErrors] = useState<{
    name: string | null;
    email: string | null;
    dateOfBirth: string | null;
    password: string | null;
    confirmPassword: string | null;
  }>({
    name: null,
    email: null,
    dateOfBirth: null,
    password: null,
    confirmPassword: null,
  });

  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      setIsLoading(true);

      // Validation des champs
      const validationErrors: any = {};

      if (!name) {
        validationErrors.name = "Please enter your username.";
      }

      if (!email) {
        validationErrors.email = "Please enter your email address.";
      } else if (!email.endsWith("@gmail.com")) {
        validationErrors.email = "Please use a valid Gmail address.";
      }

      if (!dateOfBirth) {
        validationErrors.dateOfBirth = "Please select your date of birth.";
      }

      if (!password) {
        validationErrors.password = "Please enter your password.";
      } else if (password.length < 8 || !/\d/.test(password)) {
        validationErrors.password =
          "Password must be at least 8 characters long and contain at least one digit.";
      }

      if (!confirmPassword) {
        validationErrors.confirmPassword = "Please confirm your password.";
      } else if (password !== confirmPassword) {
        validationErrors.confirmPassword = "Passwords do not match.";
      }

      setErrors(validationErrors);

      // Vérification des erreurs
      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      const result = await onRegister!(name, email, dateOfBirth!, password);

      if (result && result.error) {
        alert(result.message + result.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || dateOfBirth;
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 18);

    if (currentDate && currentDate.getTime() > minDate.getTime()) {
      alert("You must be 18 years or older to sign up.");
      return;
    }

    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView>
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
              placeholder="Enter your username here ..."
              placeholderTextColor="#fff"
              onChangeText={(text) => setName(text)}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
          <View>
            <Text style={styles.Text}>Email:</Text>
            <TextInput
              style={styles.TextInput}
              value={email}
              placeholder="Enter your email address here ..."
              placeholderTextColor="#fff"
              onChangeText={(text) => setEmail(text)}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>
          <View>
            <Text style={styles.Text}>Date of Birth:</Text>
            <Pressable onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateText}>
                {dateOfBirth ? dateOfBirth.toDateString() : "Select Date"}
              </Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            {errors.dateOfBirth && (
              <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
            )}
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
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
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
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              maxLength={20}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
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
          <Pressable
            onPress={() => {
              navigation.navigate("SignIn" as never);
            }}
          >
            <Text style={styles.textSignUp}>
              Already have an account ? SignIn
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: "#1C202F",
  },
  Pressable: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: Dimensions.get("window").width * 0.6,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#3AAF9F",
    marginBottom: 10,
  },
  ViewPressable: {
    alignItems: "center",
  },
  TextRegister: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  Informationview: {
    width: Dimensions.get("window").width * 0.8,
    marginBottom: 20,
    marginLeft: Dimensions.get("window").width * 0.1,
  },
  Text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 10,
  },
  TextInput: {
    borderWidth: 2,
    borderColor: "#3AAF9F",
    borderRadius: 15,
    height: 55,
    alignItems: "center",
    paddingLeft: 15,
    marginBottom: 20,
    color: "white",
  },
  Image: {
    width: 300,
    height: 200,
  },
  createAccountText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    marginTop: 20,
  },
  dateText: {
    borderWidth: 2,
    borderColor: "#3AAF9F",
    borderRadius: 15,
    height: 55,
    paddingLeft: 15,
    marginBottom: 20,
    color: "#fff",
    textAlignVertical: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
  },
  textSignUp: {
    textAlign: "right",
    color: "#fff",
    //fontWeight: "bold",
    //marginLeft: "20",
    fontSize: 15,
    marginBottom: 20,
  },
});

export default SignUp;
