import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useState } from "react";
import { AuthControllerApi } from "../../generated/index";
import { SignInRequest, UserRequest } from "../../generated/models";
import environment from "../environments/environment";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    role: string | null;
  };
  onRegister?: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<any>;
  onLogin?: (username: string, password: string) => Promise<any>;
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
  }>({
    token: null,
    authenticated: null,
    role: null,
  });

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    const authApi = new AuthControllerApi(environment);

    const apiParams: UserRequest = {
      username: username,
      password: password,
      email: email,
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
          role: response?.data?.user.role.nom,
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

  const value: AuthProps = {
    onRegister: register,
    onLogin: login,
    authState: authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
