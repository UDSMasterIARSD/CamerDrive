import { Platform } from "react-native";
import { ConfigurationParameters } from "../../generated";


const devConfig: ConfigurationParameters = {
  apiKey: '',
  username: '',
  password: '',
  accessToken: '',
  basePath: Platform.OS === "android" ? 'https://dca5-129-0-103-26.ngrok-free.app' : 'http://localhost:8080/api',
};

export default devConfig;
