import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import joblist from "./components/Users/joblist";
import Home from "./components/Common/Home";
import Register from "./components/Common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/Users/Profile";
import login from "./components/Common/login";
import dash from "./components/Users/dash";
import accs from "./components/Users/accs";
import new_job from "./components/Common/new_job";
import active_jobs from "./components/Users/active_jobs";
import myapplications from "./components/Users/myapplications";
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={Home} />
        <Route path="/joblist" exact component={joblist} />
        <Route path="/users/test" exact component={Register} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={login} />
        <Route path="/new_job" component={new_job} />
        <Route path="/dash" component={dash} />
        <Route path="/accs" component={accs} />
        <Route path="/active_jobs" component={active_jobs} />
        <Route path="/myapplications" component={myapplications}></Route>
      </div>
    </Router>
  );
}

export default App;
