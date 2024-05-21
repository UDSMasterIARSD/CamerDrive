import { Platform } from "react-native";
import { ConfigurationParameters } from "../../generated";


const devConfig: ConfigurationParameters = {
  apiKey: '',
  username: '',
  password: '',
  accessToken: '',
  basePath: Platform.OS === "android" ? 'https://7b98-129-0-103-83.ngrok-free.app' : 'http://localhost:8080/api',
};

export default devConfig;
