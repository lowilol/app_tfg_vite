export const AuthResponse = {
  body: {
    user: {
      _id: "",
      name: "",
      lastname: "",
      email: "",
    },
    accessToken: "",
    refreshToken: "",
  },
};

export const AuthResponseError = {
  body: {
    error: "",
  },
};

export const User = {
  _id: "",
  name: "",
  lastname: "",
  email: "",
};

export const AccessTokenResponse = {
  statusCode: 0,
  body: {
    accessToken: "",
  },
  error: "",
};