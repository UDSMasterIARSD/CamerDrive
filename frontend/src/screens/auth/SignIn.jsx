import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "start",
        alignItems: "start",
        backgroundColor: "#1C202F"
      }}
    >
      <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("./../../../assets/auth/loginImg.png")}
            style={{ width: 300, height: 200 }}
          ></Image>
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
            Login Screen
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
            padding: 8
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
              Password:
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
              placeholder="Enter your password here ..."
              placeholderTextColor="#fff"
              keyboardType="default"
              textContentType="password"
              secureTextEntry={true}
              maxLength={20}
            />
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
            <PressableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 12,
                paddingHorizontal: 32,
                height: 50,
                width: 320,
                borderRadius: 40,
                elevation: 3,
                backgroundColor: "#3AAF9F"
              }}
              onPress={() => {
                navigation.navigate("Dashbord");
              }}
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
                Login
              </Text>
            </PressableOpacity>
          </View>
          <View
            style={{
              height: 20,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp", { screen: "SignUp" });
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  color: "#fff",
                  fontWeight: "bold",
                  marginLeft: "20",
                  fontSize: 15
                }}
              >
                Don't have an account ? SignUp
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              textAlign: "center",
              marginBottom: 30,
              color: "#fff",
              fontSize: 16
            }}
          >
            Or, login with ...
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignContent: "center",
            height: 80,
            width: "auto",
            marginHorizontal: 25,
            paddingTop: 40,
            marginBottom: 80
          }}
        >
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('');
            }}
          >
            <Image
              source={require("./../../../assets/auth/icons8-google-logo-96.png")}
              style={{ width: 40, height: 40, marginTop: 10 }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require("./../../../assets/auth/icons8-facebook-logo-96.png")}
              style={{ width: 40, height: 40, marginTop: 10 }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require("./../../../assets/auth/icons8-linkedin-logo-96.png")}
              style={{ width: 40, height: 40, marginTop: 10 }}
            ></Image>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
