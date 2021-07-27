import axios from "axios";

const baseURL = "https://jobs-api.squareboat.info/api/v1";

export const Register = (obj) => async (dispatch) => {
  dispatch({ type: "REGISTER_REQUEST" });

  try {
    const { data } = await axios.post(`${baseURL}/auth/register`, obj);
    const user = data.data;

    dispatch({ type: "REGISTER_SUCCESS", payload: user });
  } catch (error) {
    console.dir(error);
  }
};

export const Login = (obj) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });

  try {
    const { data } = await axios.post(`${baseURL}/auth/login`, obj);

    const user = data.data;

    dispatch({ type: "LOGIN_SUCCESS", payload: user });
  } catch (error) {
    dispatch({
      type: "LOGIN_ERROR",
      payload: "Email or Password is Incorrect",
    });
    dispatch(errorReset());

    console.dir(error);
  }
};

export const forgotPassword = (email, history) => async (dispatch) => {
  dispatch({ type: "FORGOT_PASSWORD_REQUEST" });

  try {
    const { data } = await axios.get(`${baseURL}/auth/resetPassword`, {
      params: {
        email,
      },
    });
    const user = data.data;
    dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: user.token });
    history.push("/resetPassword");
  } catch (error) {
    dispatch({
      type: "FORGOT_PASSWORD_ERROR",
      payload: error.response.data.message,
    });
    dispatch(errorReset());
    console.dir(error);
  }
};

export const verifyandResetToken =
  (password, passwordConfirm) => async (dispatch, getState) => {
    const resetToken = getState().authReducer.resetToken;
    dispatch({ type: "VERIFY_PASSWORD_REQUEST" });

    try {
      const res = await axios.get(
        `${baseURL}/auth/resetPassword/${resetToken}`
      );
      const { success } = res.data;
      if (success === true) {
        try {
          const res = await axios.post(`${baseURL}/auth/resetPassword`, {
            password,
            confirmPassword: passwordConfirm,
            token: resetToken,
          });
          const user = res.data.data;
          dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: user });
        } catch (error) {
          dispatch({
            type: "RESET_PASSWORD_ERROR",
            payload: error.response.data.message,
          });
          dispatch(errorReset());
          console.dir(error);
        }
      }
    } catch (error) {
      console.dir(error);
      dispatch({
        type: "VERIFY_PASSWORD_ERROR",
        payload: error.response.data.message,
      });
      dispatch(errorReset());
    }
  };

export const errorReset = () => {
  return {
    type: "AUTH_ERROR_RESET",
  };
};

export const DeleteResetToken = () => {
  return {
    type: "DELETE_RESET_TOKEN",
  };
};

export const Logout = () => {
  return {
    type: "LOGOUT_SUCCESS",
  };
};
