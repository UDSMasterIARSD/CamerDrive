import { Platform } from "react-native";
import { ConfigurationParameters } from "../../generated";

const environment: ConfigurationParameters  = {
    apiKey: '',
    username: '',
    password: '',
    accessToken: '',
    basePath: Platform.OS === "android"? ' https://145a-129-0-103-13.ngrok-free.app': 'http://localhost:8080/api',
};

export default environment;