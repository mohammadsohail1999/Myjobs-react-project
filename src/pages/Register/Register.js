import React, { useState } from "react";
import "./Register.css";
import { Form, Row, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Register as register } from "../../actions/authActions";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();

  const { User } = useSelector((state) => {
    return {
      User: state.authReducer.user,
    };
  });

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    skills: "",
  });

  const [recruiter, setRecruiter] = useState(false);
  const [user, setUser] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      // event.stopPropagation();
      setValidated(true);
    }

    if (form.checkValidity() === true) {
      event.preventDefault();

      if (!user && !recruiter) {
        return;
      }

      if (user) {
        dispatch(register({ ...data, userRole: 1 }));
      }

      if (recruiter) {
        dispatch(register({ ...data, userRole: 0 }));
      }
    }
  };

  const handleData = (obj) => {
    setData({ ...data, ...obj });
  };
  const handlecheckbox = (type) => {
    if (type === "user") {
      setUser(true);
      setRecruiter(false);
    }
    if (type === "recruiter") {
      setUser(false);
      setRecruiter(true);
    }
  };

  return (
    <>
      {User ? (
        <Redirect to="/home" />
      ) : (
        <div className="register">
          <div className="form_wrapper">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <h3 className="mb-2">Signup</h3>
              <Form.Group as={Row} className="mb-3">
                <div>I am a*</div>
                <Col sm={10}>
                  <Form.Check
                    checked={recruiter}
                    inline
                    type="checkbox"
                    label="Recruiter"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    onChange={(e) => handlecheckbox("recruiter")}
                  />
                  <Form.Check
                    checked={user}
                    inline
                    type="checkbox"
                    label="User"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    onChange={(e) => handlecheckbox("user")}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="fullname">
                <Form.Label>Fullname*</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your full name"
                  value={data.name}
                  onChange={(e) => handleData({ name: e.target.value })}
                />

                <Form.Control.Feedback type="invalid">
                  This Field is Mandatory
                </Form.Control.Feedback>
              </Form.Group>
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

              <Form.Group as={Row} calssname="mb-3">
                <Col>
                  <Form.Label>password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Enter your Password"
                    value={data.password}
                    onChange={(e) => handleData({ password: e.target.value })}
                  />
                </Col>
                <Col>
                  <Form.Label>passwordConfirm</Form.Label>
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
                    The field is mandatory
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3" controlId="skills">
                <Form.Label>Skills</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Comma seperated Skills"
                  value={data.skills}
                  onChange={(e) => handleData({ skills: e.target.value })}
                />
              </Form.Group>
              <div className="form_Submit">
                <button>Sign Up</button>
                <p>
                  Have an Account? <Link to="/login">Login</Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
