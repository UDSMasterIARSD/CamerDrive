import { Platform } from "react-native";
import { ConfigurationParameters } from "../../generated";


const devConfig: ConfigurationParameters = {
  apiKey: '',
  username: '',
  password: '',
  accessToken: '',
  basePath: Platform.OS === "android" ? 'https://c4c3-129-0-80-172.ngrok-free.app' : 'http://localhost:8080/api',
};

export default devConfig;
