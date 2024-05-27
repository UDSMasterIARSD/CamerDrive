import { Platform } from "react-native";
import { ConfigurationParameters } from "../../generated";


const devConfig: ConfigurationParameters = {
  apiKey: '',
  username: '',
  password: '',
  accessToken: '',
  basePath: Platform.OS === "android" ? 'https://0eb5-129-0-80-248.ngrok-free.app' : 'http://localhost:8080/api',
};

export default devConfig;
