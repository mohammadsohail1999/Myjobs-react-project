import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "./postjob.css";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { PostJob as postJob } from "../../actions/jobRecruiterAction";
import SideCumb from "../../Components/breadCumb/SideCumb";

const PostJob = () => {
  const [validated, setValidated] = useState(false);
  
  const [data, setData] = useState({
    title: "",
    description: "",
    location: "",
  });

  const { user, postSuccess } = useSelector((state) => {
    return {
      user: state.authReducer.user,
      postSuccess: state.postReducer.jobPostSuccess,
    };
  });

  const history = useHistory();

  useEffect(() => {
    if (postSuccess) {
      history.push("/home");
    }
  }, [postSuccess]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user.userRole !== 0) {
      history.push("/home");
      toast.warn("You're not logged In As recruiter");
    }
  }, [user]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      // event.stopPropagation();
      setValidated(true);
    }

    if (form.checkValidity() === true) {
      event.preventDefault();
      dispatch(postJob(data));
    }
  };

  const handleData = (obj) => {
    setData({ ...data, ...obj });
  };

  return (
    <>
      <div className="postJob">
        {/* <SideCumb /> */}
        <div className="postJob_wrapper">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h3 className="mb-3">Post A Job</h3>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Job Title*</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Job Title"
                value={data.title}
                onChange={(e) => handleData({ title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Job Description*</Form.Label>
              <Form.Control
                as={"textarea"}
                required
                type="text"
                placeholder="Enter Job Description"
                value={data.description}
                onChange={(e) => handleData({ description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Location*</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Location"
                value={data.location}
                onChange={(e) => handleData({ location: e.target.value })}
              />
              <Form.Control.Feedback type="invalid">
                All Fields Are Mandatory.
              </Form.Control.Feedback>
            </Form.Group>
            <div className="form_Submit">
              <button>Post Job</button>{" "}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default PostJob;
