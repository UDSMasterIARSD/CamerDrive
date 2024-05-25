import { Platform } from "react-native";
import { ConfigurationParameters } from "../../generated";


const devConfig: ConfigurationParameters = {
  apiKey: '',
  username: '',
  password: '',
  accessToken: '',
  basePath: Platform.OS === "android" ? 'https://9e07-102-244-41-40.ngrok-free.app' : 'http://localhost:8080/api',
};

export default devConfig;
