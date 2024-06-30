import React, { createContext, useState } from "react";
import { validationError } from "../constants/validationError";

export const setTokenToLocalStorage = (token: string): void => {
  if (!token) return;
  localStorage.setItem("token", token);
}

export const removeTokenFromLocalStorage = (token: string): void => {
  if (!token) return;
  localStorage.removeItem("token");
}

const checkAuthentication = (): boolean => {
  let token = localStorage.getItem("token");
  if (token) return true;
  return false;
}

const initialData = {
  isAuthenticated: false,
  errorMessage: '',
  loading: false,
  setIsAuthenticated: (isAuthenticated: boolean) => { },
  signInOrSignUpHandler: (url: string, data: object) => { }
}

type AuthContextValue = {
  isAuthenticated: boolean;
  errorMessage: string,
  loading: boolean,
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  signInOrSignUpHandler: (url: string, data: object) => void
}

export const AuthContext = createContext<AuthContextValue>(initialData)

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthentication())
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const signInOrSignUpHandler = async (url: string, formData: object) => {
    try {
      setErrorMessage('')
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      if (data.token) {
        setTokenToLocalStorage(data.token)
        setIsAuthenticated(true);
      }
    } catch (e: unknown) {
      const error = e as Error
      setErrorMessage(error?.message || validationError.COMMON_ERROR)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      errorMessage,
      loading,
      setIsAuthenticated,
      signInOrSignUpHandler
    }}>
      {children}
    </AuthContext.Provider>
  )
}

