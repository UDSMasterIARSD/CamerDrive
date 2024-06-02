import { Platform } from "react-native";
import { ConfigurationParameters } from "../../generated";


const devConfig: ConfigurationParameters = {
    apiKey: '',
    username: '',
    password: '',
    accessToken: '',
    basePath: Platform.OS === "android" ? 'https://3f3b-129-0-80-153.ngrok-free.app' : 'http://localhost:8080/api'
};

export default devConfig;
