import React from "react";
import "./Landing.css";
const Landing = () => {
  return (
    <div className="landing">
      <div className="landing_banner">
        <div className="ld_left">
          <h1>Welcome To</h1>
          <h1>
            My<span style={{color: "#43AFFF"}}>Jobs</span>
          </h1>
          <div className="get_started">
            <button>get Started</button>
          </div>
        </div>
        <img
          src="https://images.pexels.com/photos/927451/pexels-photo-927451.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="job"
        />
      </div>
      <div className="why_us">
        <h3>Why Us</h3>

        <div className="cards">
          <div className="Card">
            <h3>Get More Visibility</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eaque
              delectus aliquam
            </p>
          </div>
          <div className="Card">
            <h3>Organize Your Candidates</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eaque
              delectus aliquam iure
            </p>
          </div>
          <div className="Card">
            <h3>Verify Their Abilites</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eaque
              delectus aliquam
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
