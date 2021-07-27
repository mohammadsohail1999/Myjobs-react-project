import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../actions/authActions";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "./forgotPassword.css";
import { Redirect } from "react-router-dom";

const ForgotPassword = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const { error, resetToken, user } = useSelector((state) => {
    return {
      error: state.authReducer.error,
      resetToken: state.authReducer.resetToken,
      user: state.authReducer.user,
    };
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      setValidated(true);
    }
    if (form.checkValidity() === true) {
      event.preventDefault();
      dispatch(forgotPassword(email, history));
    }
  };

  return (
    <>
      {user ? (
        <Redirect to="/home" />
      ) : (
        <div className="forgetPassword">
          <div className="forgetPassword_wrapper">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <h3 className="mb-3">Forgot your Password?</h3>
              <p className="mb-3">
                Enter the email associated with your account and we will provide
                you instuctions to reset your Password.
              </p>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter your E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Invalid email Address
                </Form.Control.Feedback>
              </Form.Group>

              <div className="form_Submit">
                <button>Submit</button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
