import React, { useEffect, useState } from "react";
import {
  DeleteResetToken,
  verifyandResetToken,
} from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import "./resetPassword.css";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({ password: "", confirmPassword: "" });

  const handleData = (obj) => {
    setData({ ...data, ...obj });
  };

  const { resetToken, error, user } = useSelector((state) => {
    return {
      resetToken: state.authReducer.resetToken,
      error: state.authReducer.error,
      user: state.authReducer.user,
    };
  });

  useEffect(() => {
    toast.error(error);
  }, [error]);
  useEffect(() => {
    if (!resetToken && !user) {
      history.push("/forgotPassword");
    }
  }, [resetToken, user]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      setValidated(true);
    }
    if (form.checkValidity() === true) {
      event.preventDefault();
      if (data.confirmPassword === data.password) {
        dispatch(verifyandResetToken(data.password, data.confirmPassword));
      } else {
        toast.warn("Passwords are not same.");
      }
    }
  };

  return (
    <>
      {user ? (
        <Redirect to="/home" />
      ) : (
        <div className="resetPassword">
          <div className="resetPassword_wrapper">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <h3 className="mb-3">Reset Password.</h3>
              <p className="mb-3">Enter Your new Password below.</p>
              <Form.Group className="mb-3" controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter your Password"
                  value={data.password}
                  onChange={(e) => handleData({ password: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  new Password is Required.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmnewPassword">
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm your Password"
                  value={data.confirmPassword}
                  onChange={(e) =>
                    handleData({ confirmPassword: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Confirm your new Password.
                </Form.Control.Feedback>
              </Form.Group>
              <div className="form_Submit">
                <button className="rp_btn">Reset</button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
