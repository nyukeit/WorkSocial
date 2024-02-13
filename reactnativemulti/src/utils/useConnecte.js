import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
  const getToken = async () => {
    const token = await AsyncStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  };

  getToken();
}, []);


  const login = (token, userId) => {
    AsyncStorage.setItem("userToken", token);
    AsyncStorage.setItem("userId", userId);
    setIsLoggedIn(true);
  };

  const logout = () => {
    AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  const value = useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
