import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "../../store/store";
import { Login, logout } from "../../actions/index";
export default class Navbar extends Component {
  // const classes = useStyles();
  constructor(props) {
    super(props);
    this.state = {
      cur_role: "guest",
      cur_name: "",
    };
    store.subscribe(() => {
      this.setState({ cur_role: store.getState().role });
      this.setState({ cur_name: store.getState().name });
    });
  }
  componentWillMount() {
    console.log("DSAD");
  }
  render() {
    const x = store.getState();
    return (
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6">Job portal</Typography>

            {this.state.cur_role == "guest" && (
              <div>
                <Button color="inherit">
                  <Link
                    to="/login"
                    style={{ color: "White" }}
                    className="nav-link"
                  >
                    Login
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link
                    to="/register"
                    style={{ color: "White" }}
                    className="nav-link"
                  >
                    Register
                  </Link>
                </Button>
              </div>
            )}
            {this.state.cur_role == "Job Applicant" && (
              <div>
                <Button color="inherit">
                  <Link
                    to="/profile"
                    style={{ color: "White" }}
                    className="nav-link"
                  >
                    {this.state.cur_name}
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link
                    to="/joblist"
                    style={{ color: "White" }}
                    className="nav-link"
                  >
                    Joblist
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link
                    to="/myapplications"
                    style={{ color: "White" }}
                    className="nav-link"
                  >
                    My applications
                  </Link>
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    store.dispatch(logout());
                  }}
                >
                  <Link to="/" style={{ color: "White" }} className="nav-link">
                    Logout
                  </Link>
                </Button>
              </div>
            )}
            {this.state.cur_role == "Recruiter" && (
              <div>
                <Button color="inherit">
                  <Link
                    to="/profile"
                    style={{ color: "White" }}
                    className="nav-link"
                  >
                    {this.state.cur_name}
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link
                    to="/new_job"
                    style={{ color: "White" }}
                    className="nav-link"
                  >
                    Create new job
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link
                    to="/active_jobs"
                    style={{ color: "White" }}
                    className="nav-link"
                  >
                    Active Jobs
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link
                    to="/accs"
                    style={{ color: "White" }}
                    className="nav-link"
                  >
                    Accepted employees
                  </Link>
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    store.dispatch(logout());
                  }}
                >
                  <Link to="/" style={{ color: "White" }} className="nav-link">
                    Logout
                  </Link>
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
