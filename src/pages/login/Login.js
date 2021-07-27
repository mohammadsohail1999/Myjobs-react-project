import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Login as login } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./login.css";

const Login = () => {
  const [validated, setValidated] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { error, user } = useSelector((state) => {
    return {
      error: state.authReducer.error,
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
      dispatch(login(data));
    }
  };

  const handleData = (obj) => {
    setData({ ...data, ...obj });
  };

  return (
    <>
      {" "}
      {user ? (
        <Redirect to="/home" />
      ) : (
        <div className="login">
          <div className="login_wrapper">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <h3 className="mb-3">Login</h3>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter your e-mail"
                  value={data.email}
                  onChange={(e) => handleData({ email: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  Invalid email Address
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-3" controlId="password">
                <div className="login_password">
                  <Form.Label>Password*</Form.Label>
                  <p>
                    <Link to="/forgotPassword">Forgot your password ?</Link>
                  </p>
                </div>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={(e) => handleData({ password: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  Invalid Password
                </Form.Control.Feedback>
              </Form.Group>
              <div className="form_Submit">
                <button>Login</button>
                <p>
                  New to MyJobs? <Link to="/register">Create an Account.</Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
