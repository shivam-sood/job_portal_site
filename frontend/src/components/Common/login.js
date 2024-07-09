import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { withRouter } from "react-router-dom";
import { store } from "../../store/store";
import { Login, logout } from "../../actions/index";

var bcrypt = require("bcryptjs");
// const saltRounds = 10;
export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeEmail(event) {
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hash = bcrypt.hashSync("myPlaintextPassword", salt);
    // console.log(hash);\
    this.setState({ email: event.target.value });
  }
  onChangepassword(event) {
    this.setState({ password: event.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("http://localhost:4000/login", newUser)
      .then((res) => {
        alert("Logged in " + res.data.name + ".");
        console.log(res.data.bio);
        console.log(res);
        if (typeof res.data.bio !== "undefined") {
          store.dispatch(Login("Recruiter", res.data.name, res.data.email));
        } else {
          store.dispatch(Login("Job Applicant", res.data.name, res.data.email));
        }
        console.log(store.getState());
        this.props.history.push("/");
      })
      .catch(function (err) {
        // handle error
        alert("Error:" + err.response.data.error);
      })
      .then(function () {});

    this.setState({
      email: "",
      password: "",
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <TextField
              id="standard-basic"
              label="Email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.onChangepassword}
              required
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
