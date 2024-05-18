import { Platform } from "react-native";
import { ConfigurationParameters } from "../../generated";

const environment: ConfigurationParameters  = {
    apiKey: '',
    username: '',
    password: '',
    accessToken: '',
    basePath: Platform.OS === "android"? 'https://665d-102-244-160-69.ngrok-free.app': 'http://localhost:8080/api',
};

export default environment;