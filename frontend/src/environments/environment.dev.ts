import { Platform } from "react-native";
import { ConfigurationParameters } from "../../generated";

const environment: ConfigurationParameters  = {
    apiKey: '',
    username: '',
    password: '',
    accessToken: '',
    basePath: Platform.OS === "android"? 'https://8293-41-202-219-246.ngrok-free.app': 'http://localhost:8080/api',
};

export default environment;