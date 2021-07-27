import React, { useEffect } from "react";
import Card from "../../Components/Card/Card";
import { getjobsbyRecruiter } from "../../actions/jobRecruiterAction";
import { useDispatch, useSelector } from "react-redux";
import "./homerec.css";

const HomeRec = () => {
  const dispatch = useDispatch();

  const { jobs } = useSelector((state) => {
    return {
      jobs: state.postReducer.jobs,
    };
  });

  useEffect(() => {
    dispatch(getjobsbyRecruiter());
  }, []);

  return (
    <div className="home_rec">
      <h3>Job Posted by You</h3>
      <div className="jobs_wrapper">
        {jobs.length > 0 ? (
          jobs.map((el) => (
            <Card
              key={el.id}
              title={el.title}
              description={el.description}
              location={el.location}
            />
          ))
        ) : (
          <div className="nojobs">no Jobs Posted</div>
        )}
      </div>
    </div>
  );
};

export default HomeRec;
