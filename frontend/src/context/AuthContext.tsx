import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthControllerApi } from "../../generated/index";
import { SignInRequest, UserRequest } from "../../generated/models";
import environment from "../environments/environment";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    role: string | null;
    userName: string | null;
  };
  onRegister?: (
    username: string,
    email: string,
    dateNaiss: Date,
    password: string
    //confirmPassword: string
  ) => Promise<any>;
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN = "TOKEN";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigation = useNavigation();
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    role: string | null;
    userName: string | null;
  }>({
    token: null,
    authenticated: null,
    role: null,
    userName: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN);
      const storedTime = await SecureStore.getItemAsync("TIME");

      console.log("stored token: " + token);
      console.log("stored time: " + storedTime);

      if (token) {
        const currentTime = new Date().toISOString();
        console.log("current time: " + currentTime);
        const timeDifference =
          Math.abs(
            new Date(currentTime).getTime() - new Date(storedTime!).getTime()
          ) / 1000; // Difference in seconds
        console.log("time difference: " + timeDifference);
        const exp: number = 600;
        if (timeDifference > exp) {
          // Less than 1 minute
          console.log("Token expired. Deleting token and time.");
          await SecureStore.deleteItemAsync(TOKEN);
          await SecureStore.deleteItemAsync("TIME");
        } else {
          console.log("Token not expired");
          setAuthState({
            token: token,
            authenticated: true,
            userName: authState?.userName,
            role: authState?.role,
          });
        }
      }
    };
    loadToken();
  }, []);
  const register = async (
    username: string,
    email: string,
    dateNaiss: Date,
    password: string
  ) => {
    const authApi = new AuthControllerApi(environment);

    const apiParams: UserRequest = {
      username: username,
      password: password,
      email: email,
      dateNaiss: dateNaiss,
    };

    try {
      const response = await authApi.register(apiParams);
      console.log(response.data.email);
      //alert(response.data.email);

      navigation.navigate("SignIn"); // Redirection vers la page de connexion
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const login = async (username: string, password: string) => {
    const authApi = new AuthControllerApi(environment);
    const apiParams: SignInRequest = {
      username: username,
      password: password,
    };

    console.log(apiParams);

    await authApi
      .login(apiParams)
      .then(async (response) => {
        setAuthState({
          token: response?.data?.token,
          authenticated: true,
          role: response?.data?.user?.role?.nom,
          userName: response?.data?.user?.username,
        });
        const currentTime = new Date().toISOString();
        console.log(currentTime);
        await SecureStore.setItemAsync("TIME", currentTime);
        await SecureStore.setItemAsync(TOKEN, response?.data?.token);

        console.log(response.data.user);
        alert(response.data.user);
      })
      .catch((error) => {
        console.log(error);
        //return error;
        alert(error);
      });
  };

  const logout = async () => {
    let token: string | null = await SecureStore.getItemAsync(TOKEN);
    if (token == null) {
      token = "";
    } else {
      setAuthState({
        token: "",
        authenticated: false,
        userName: authState?.userName,
        role: authState?.role,
      });

      await SecureStore.deleteItemAsync(TOKEN);
      alert("you have been log out");
    }
  };

  const value: AuthProps = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState: authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
