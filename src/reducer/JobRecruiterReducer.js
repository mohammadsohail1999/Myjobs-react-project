const jobRecruiterReducer = (
  state = {
    jobs: [],
    getJobsRequest: false,
    getJobsSuccess: false,
    getJobsError: false,
    jobPostRequest: false,
    jobPostSuccess: false,
    jobPostError: false,
  },
  action
) => {
  switch (action.type) {
    case "GET_JOBS_REQUEST":
      return {
        ...state,
        getJobsRequest: true,
        getJobsSuccess: false,
        getJobsError: false,
        jobPostRequest: false,
        jobPostSuccess: false,
        jobPostError: false,
      };

    case "GET_JOBS_SUCCESS":
      return {
        ...state,
        getJobsRequest: false,
        getJobsSuccess: true,
        getJobsError: false,
        jobs: action.payload,
      };

    case "GET_JOBS_ERROR":
      return {
        ...state,
        getJobsRequest: false,
        getJobsSuccess: false,
        getJobsError: true,
      };

    case "POST_REQUEST":
      return {
        ...state,
        jobPostSuccess: false,
        jobPostRequest: true,
        jobPostError: false,
      };
    case "POST_SUCCESS":
      return {
        ...state,
        jobPostSuccess: true,
        jobPostRequest: false,
        jobPostError: false,
      };
    case "POST_ERROR":
      return {
        ...state,
        jobPostSuccess: false,
        jobPostRequest: false,
        jobPostError: true,
      };

    case "LOGOUT_SUCCESS":
      return {
        ...state,
        jobs: [],
        getJobsRequest: false,
        getJobsSuccess: false,
        getJobsError: false,
        jobPostRequest: false,
        jobPostSuccess: false,
        jobPostError: false,
      };

    default:
      return state;
  }
};

export default jobRecruiterReducer;
