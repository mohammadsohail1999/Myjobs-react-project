import axios from "axios";

const baseURL = "https://jobs-api.squareboat.info/api/v1";

export const PostJob = (obj) => async (dispatch, getState) => {
  
    const token = getState().authReducer.user.token;

   dispatch({ type: "POST_REQUEST" });



  try {
    const res = await axios.post(`${baseURL}/jobs`, obj, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: "POST_SUCCESS" });
  } catch (error) {
    console.dir(error);
    dispatch({ type: "POST_ERROR" });
  }
};

export const getjobsbyRecruiter = () => async (dispatch, getState) => {
  const token = getState().authReducer.user.token;
  dispatch({ type: "GET_JOBS_REQUEST" });

  try {
    const { data } = await axios.get(`${baseURL}/recruiters/jobs`, {
      headers: {
        Authorization: token,
      },
    });
    const jobs = data.data.data;
    console.log(jobs);
    dispatch({ type: "GET_JOBS_SUCCESS", payload: jobs });
  } catch (error) {
    console.dir(error);
    dispatch({ type: "GET_JOBS_ERROR" });
  }
};
