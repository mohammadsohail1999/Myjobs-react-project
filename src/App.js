import { BrowserRouter as Router, Route } from "react-router-dom";
import Topbar from "./Components/Topbar/Topbar";
import Landing from "./pages/landing/Landing";
import Register from "./pages/Register/Register";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import ForgetPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ProtectedRoute from "./Components/protectedRoute/ProtectedRoute";
import PostJob from "./pages/PostJob/PostJob";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Topbar />
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/forgotPassword" exact component={ForgetPassword} />
        <Route path="/resetPassword" exact component={ResetPassword} />
        <ProtectedRoute path="/home" exact>
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path="/postJob" exact>
          <PostJob />
        </ProtectedRoute>
      </Router>
    </div>
  );
}

export default App;
