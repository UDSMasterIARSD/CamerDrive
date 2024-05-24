import { Platform } from "react-native";
import { ConfigurationParameters } from "../../generated";


const devConfig: ConfigurationParameters = {
  apiKey: '',
  username: '',
  password: '',
  accessToken: '',
  basePath: Platform.OS === "android" ? 'https://33ba-41-202-207-148.ngrok-free.app' : 'http://localhost:8080/api',
};

export default devConfig;
