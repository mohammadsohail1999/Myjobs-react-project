import React from "react";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../../actions/authActions";
import "./Topbar.css";
import { toast } from "react-toastify";

const Topbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return {
      user: state.authReducer.user,
    };
  });

  return (
    <div className="topbar_wrapper">
      <div className="topbar">
        <h3 className="header">
          <Link style={{ textDecoration: "none" }} to="/home">
            {" "}
            My<span>Jobs</span>{" "}
          </Link>
        </h3>
        {!user ? (
          <div className="auth">
            <span>
              <Link
                style={{ textDecoration: "none", color: "#fff" }}
                to="/login"
              >
                Login
              </Link>{" "}
            </span>
            /
            <span>
              <Link
                style={{ textDecoration: "none", color: "#fff" }}
                to="/register"
              >
                Register
              </Link>{" "}
            </span>
          </div>
        ) : (
          <>
            <div className="sideOptions">
              {user.userRole === 0 && (
                <div className="RecruiterPostJob">
                  {" "}
                  <div>
                    <Link
                      style={{ textDecoration: "none", color: "#fff" }}
                      to="postJob"
                    >
                      Post A Job
                    </Link>
                  </div>{" "}
                </div>
              )}
              <NavDropdown title={`${user.name}`} id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={(e) => {
                    dispatch(Logout());
                    toast(`You have logged out successfully`);
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Topbar;
