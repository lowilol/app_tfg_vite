
import React, { useContext, createContext, useState, useEffect } from "react";
import { API_URL } from "./authConstants";
import requestNewAccessToken from "./requestNewAccessToken";

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  setAccessTokenAndRefreshToken: (_accessToken, _refreshToken) => {},
  getRefreshToken: () => {},
  saveUser: (_userData) => {},
  getUser: () => ({}),
  signout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isloading, setIsLoading] = useState(true);

  function getAccessToken() {
    return accessToken;
  }

  function saveUser(userData) {
    setAccessTokenAndRefreshToken(
      userData.body.accessToken,
      userData.body.refreshToken
    );
    setUser(userData.body.user);
    setIsAuthenticated(true);
  }

  function setAccessTokenAndRefreshToken(accessToken, refreshToken) {
    console.log("setAccessTokenAndRefreshToken", accessToken, refreshToken);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    localStorage.setItem("token", JSON.stringify({ refreshToken }));
  }

  function getRefreshToken() {
    if (!!refreshToken) {
      return refreshToken;
    }
    const token = localStorage.getItem("token");
    if (token) {
      const { refreshToken } = JSON.parse(token);
      setRefreshToken(refreshToken);
      return refreshToken;
    }
    return null;
  }

  async function getNewAccessToken(refreshToken) {
    const token = await requestNewAccessToken(refreshToken);
    if (token) {
      return token;
    }
  }

  function getUser() {
    return user;
  }

  function signout() {
    localStorage.removeItem("token");
    setAccessToken("");
    setRefreshToken("");
    setUser(undefined);
    setIsAuthenticated(false);
  }

  async function checkAuth() {
    try {
      if (!!accessToken) {
        const userInfo = await retrieveUserInfo(accessToken);
        setUser(userInfo);
        setAccessToken(accessToken);
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        const token = localStorage.getItem("token");
        if (token) {
          console.log("useEffect: token", token);
          const refreshToken = JSON.parse(token).refreshToken;
          getNewAccessToken(refreshToken)
            .then(async (newToken) => {
              const userInfo = await retrieveUserInfo(newToken);
              setUser(userInfo);
              setAccessToken(newToken);
              setIsAuthenticated(true);
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        setAccessTokenAndRefreshToken,
        getRefreshToken,
        saveUser,
        getUser,
        signout,
      }}
    >
      {isloading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

async function retrieveUserInfo(accessToken) {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const json = await response.json();
      console.log(json);
      return json.body;
    }
  } catch (error) {}
}

export const useAuth = () => useContext(AuthContext);