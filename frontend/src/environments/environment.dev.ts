import { Platform } from "react-native";
import { ConfigurationParameters } from "../../generated";

const environment: ConfigurationParameters  = {
    apiKey: '',
    username: '',
    password: '',
    accessToken: '',
    basePath: Platform.OS === "android"? ' https://57da-129-0-103-19.ngrok-free.app': 'http://localhost:8080/api',
};

export default environment;