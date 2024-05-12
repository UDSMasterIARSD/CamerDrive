import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useState } from "react";
//import { AuthApi } from "../../generated/index";
import { AuthControllerApi } from "../../generated/index";
import { SignInRequest, UserRequest } from "../../generated/models";
import environment from "../environments/environment";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (
    username: string,
    email: string,
    password: string
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
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  //register the user
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
    console.log(apiParams);

    authApi
      .register(apiParams)
      .then((response) => {
        console.log(response.data.email);
        alert(response.data.email);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
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
        });
        const currentTime = new Date().toISOString(); // Get the current time in milliseconds
        console.log(currentTime);
        await SecureStore.setItemAsync("TIME", currentTime);
        await SecureStore.setItemAsync(TOKEN, response?.data?.token);

        console.log(response.data.user);
        alert(response.data.user);
      })
      .catch((error) => {
        console.log(error);
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
