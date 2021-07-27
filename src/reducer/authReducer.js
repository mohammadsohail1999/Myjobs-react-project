const authReducer = (
  state = {
    user: null,
    error: false,
    resetToken: null,
  },
  action
) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return { ...state };
    case "REGISTER_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };

    case "LOGIN_REQUEST":
      return { ...state };

    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };

    case "LOGIN_ERROR":
      return { ...state, error: action.payload };

    case "LOGOUT_SUCCESS":
      localStorage.removeItem("user");
      return { ...state, user: null, error: false };

    case "FORGOT_PASSWORD_REQUEST":
      return {
        ...state,
        resetToken: null,
        error: false,
      };
    case "FORGOT_PASSWORD_SUCCESS":
      return {
        ...state,
        resetToken: action.payload,
        error: false,
      };
    case "FORGOT_PASSWORD_ERROR":
      return {
        ...state,
        resetToken: null,
        error: action.payload,
      };

    case "VERIFY_PASSWORD_ERROR":
      return {
        ...state,
        resetToken: null,
        error: action.payload,
      };

    case "RESET_PASSWORD_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        resetToken: null,
      };
    case "RESET_PASSWORD_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "AUTH_ERROR_RESET":
      return { ...state, error: false };

    case "DELETE_RESET_TOKEN":
      return { ...state, resetToken: null };

    default:
      return state;
  }
};

export default authReducer;
