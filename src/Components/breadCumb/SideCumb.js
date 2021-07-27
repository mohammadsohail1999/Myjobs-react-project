import React, { useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
const SideCumb = () => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("home");

  const handleActive = (type) => {
    setActive(type);
  };

  return (
    <div className="sidebar">
      <Breadcrumb>
        <Breadcrumb.Item
          active={active === "home"}
          onClick={(e) => handleActive("home")}
        >
          <Link to="/home">Home</Link>
        </Breadcrumb.Item>
        {pathname === "/postJob" && (
          <Breadcrumb.Item
            active={active === "postjob"}
            onClick={(e) => handleActive("postjob")}
          >
            Post Job
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </div>
  );
};

export default SideCumb;
