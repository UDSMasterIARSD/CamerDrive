import { Platform } from "react-native";
import { ConfigurationParameters } from "../../generated";


const devConfig: ConfigurationParameters = {
    apiKey: '',
    username: '',
    password: '',
    accessToken: '',
    basePath: Platform.OS === "android" ? 'https://bd35-129-0-80-181.ngrok-free.app' : 'http://localhost:8080/api'
};

export default devConfig;
