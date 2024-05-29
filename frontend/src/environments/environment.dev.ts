import { Platform } from "react-native";
import { ConfigurationParameters } from "../../generated";


const devConfig: ConfigurationParameters = {
  apiKey: '',
  username: '',
  password: '',
  accessToken: '',
  basePath: Platform.OS === "android" ? 'https://aa59-129-0-80-157.ngrok-free.app' : 'http://localhost:8080/api',
};

export default devConfig;
