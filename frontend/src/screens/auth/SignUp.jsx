import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ViewComponent,
  TextInput,
  ScrollView,
  Pressable,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "start",
        alignItems: "start",
        backgroundColor: "#1C202F"
      }}
    >
      <ScrollView style={{ marginTop: 30 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("./../../../assets/auth/createAccount.png")}
            style={{ width: 300, height: 200 }}
          ></Image>
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
            Create my Account
          </Text>
        </View>
        <View
          style={{
            // backgroundColor: "#FFF1FE",
            opacity: 0.9,
            flexDirection: "column",
            margin: 20,
            height: 330,
            borderRadius: 20,
            justifyContent: "start",
            padding: 1,
            marginBottom: 220
          }}
        >
          <View>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 10
              }}
            >
              Username:
            </Text>
            <TextInput
              style={{
                height: 65,
                margin: 12,
                borderWidth: 3,
                borderColor: "#3AAF9F",
                color: "#fff",
                padding: 10,
                borderRadius: 20,
                backgroundColor: "#1C202F",
                fontSize: 16
              }}
              placeholder="Enter your email address here ..."
              placeholderTextColor="#fff"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
          </View>
          <View>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 10
              }}
            >
              Email:
            </Text>
            <TextInput
              style={{
                height: 65,
                margin: 12,
                borderWidth: 3,
                borderColor: "#3AAF9F",
                color: "#fff",
                padding: 10,
                borderRadius: 20,
                backgroundColor: "#1C202F",
                fontSize: 16
              }}
              placeholder="Enter your email address here ..."
              placeholderTextColor="#fff"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
          </View>
          <View>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 10
              }}
            >
              Date de Naissance :
            </Text>
            <TextInput
              style={{
                height: 65,
                margin: 12,
                borderWidth: 3,
                borderColor: "#3AAF9F",
                color: "#fff",
                padding: 10,
                borderRadius: 20,
                backgroundColor: "#1C202F",
                fontSize: 16
              }}
              placeholder="Enter your email address here ..."
              placeholderTextColor="#fff"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
          </View>
          <View>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 10
              }}
            >
              Password:
            </Text>
            <TextInput
              style={{
                height: 65,
                margin: 12,
                borderWidth: 3,
                borderColor: "#3AAF9F",
                color: "#fff",
                padding: 10,
                borderRadius: 20,
                backgroundColor: "#1C202F",
                fontSize: 16
              }}
              placeholder="Enter your password here ..."
              placeholderTextColor="#fff"
              keyboardType="default"
              textContentType="password"
              secureTextEntry={true}
              maxLength={20}
            />
          </View>
          <View>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 10
              }}
            >
              Confirm Password :
            </Text>
            <TextInput
              style={{
                height: 65,
                margin: 12,
                borderWidth: 3,
                borderColor: "#3AAF9F",
                padding: 10,
                borderRadius: 20,
                backgroundColor: "#1C202F",
                color: "#fff",
                fontSize: 16
              }}
              placeholder="Confirm your password here ..."
              placeholderTextColor="#fff"
              keyboardType="default"
              textContentType="password"
              secureTextEntry={true}
              maxLength={20}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 80,
            position: "relative",
            padding: 30
          }}
        >
          <Pressable
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 12,
              paddingHorizontal: 32,
              height: 50,
              width: 320,
              borderRadius: 40,
              elevation: 3,
              backgroundColor: "#3AAF9F",
            }}
            onPress={() => console.log("Login")}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 21,
                fontWeight: "bold",
                letterSpacing: 0.25,
                color: "white"
              }}
            >
              Register
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
