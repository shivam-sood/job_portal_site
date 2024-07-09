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
export default class Register extends Component {
  constructor(props) {
    super(props);
    // store.dispatch(logout());\
    this.state = {
      name: "",
      errorname: "",
      email: "",
      erroremail: "",
      password: "",
      error: "",
      role: "Job Applicant",
      contact: "",
      errorcontact: "",
      bio: "",
      error: "",
      skills: [],
      education: [{ name: "", start: "", end: "" }],
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onchangerole = this.onchangerole.bind(this);
    this.onchangecontact = this.onchangecontact.bind(this);
    this.onchangebio = this.onchangebio.bind(this);
    this.onchangeskills = this.onchangeskills.bind(this);
  }
  onchangeskills(event, values) {
    this.setState({ skills: values });
    console.log(this.state.skills);
  }
  onchangerole(event) {
    this.setState({ role: event.target.value });
  }
  onChangeUsername(event) {
    this.setState({ name: event.target.value });
  }
  onchangebio(event) {
    this.setState({ bio: event.target.value });
  }
  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  onChangepassword(event) {
    this.setState({ password: event.target.value });
  }
  onchangecontact(event) {
    this.setState({ contact: event.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.state.email == "" || this.state.email == null) {
      alert("Email cant be empty");
      return;
    }
    if (this.state.name == "" || this.state.name == null) {
      alert("Name cant be empty");
      return;
    }
    if (this.state.password == "" || this.state.password == null) {
      alert("password cant be empty");
      return;
    }
    var regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexp.test(this.state.email)) {
      alert("Enter proper email.");
      return;
    }
    regexp = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (this.state.role == "Recruiter" && !regexp.test(this.state.contact)) {
      alert("Enter proper contact number.");
      return;
    }
    regexp = /^(?:\b\w+\b[\s\r\n]*){1,250}$/;
    if (this.state.role == "Recruiter" && !regexp.test(this.state.bio)) {
      alert("Enter proper Bio(max 250 words).");
      return;
    }
    if (
      this.state.role == "Job Applicant" &&
      (this.state.skills == "" || this.state.skills == null)
    ) {
      alert("Enter skills please.");
      return;
    }
    if (
      this.state.role == "Job Applicant" &&
      (this.state.education[0].name == "" ||
        this.state.education[0].name == null)
    ) {
      alert("Enter proper education please.");
      return;
    }
    if (
      this.state.role == "Job Applicant" &&
      (this.state.education[0].start == "" ||
        this.state.education[0].start == null)
    ) {
      alert("Enter proper educatiosn please.");
      return;
    }
    regexp = /^(19|20)\d{2}$/;
    if (
      this.state.role == "Job Applicant" &&
      !regexp.test(this.state.education[0].start)
    ) {
      alert("Enter proper educations please.");
      return;
    }

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
      contact: this.state.contact,
      bio: this.state.bio,
      skills: this.state.skills,
      education: this.state.education,
    };
    axios
      .post("http://localhost:4000/register", newUser)
      .then((res) => {
        alert("Registered " + res.data.name + ". Please Login");

        this.props.history.push("/login");
        console.log(res.data);
      })
      .catch(function (err) {
        // handle error
        console.log();
        console.log("Erroe");
        alert("Error:" + err.response.data.error || err);
      })
      .then(function () {});

    this.setState({
      name: "",
      email: "",
      password: "",
      contact: "",
      bio: "",
      skills: [],
      education: [{ name: "", start: "", end: "" }],
    });
  }
  create() {
    const len = this.state.education.length;
    return this.state.education.map((el, i) => (
      <div key={i}>
        <TextField
          id="standard-basic"
          label="Institute Name"
          value={el.name || ""}
          onChange={this.educhange.bind(this, i, 0)}
          required
        />
        <TextField
          id="standard-basic"
          label="Starting year"
          value={el.start || ""}
          onChange={this.educhange.bind(this, i, 1)}
          required
        />
        <TextField
          id="standard-basic"
          label="End year"
          value={el.end || ""}
          onChange={this.educhange.bind(this, i, 2)}
        />
        {i != 0 && (
          // <input
          //   type="button"
          //   value="remove"
          //   onClick={this.remove.bind(this, i)}
          // />
          <IconButton>
            <RemoveIcon
              color="action"
              onClick={this.remove.bind(this, i)}
            ></RemoveIcon>
          </IconButton>
        )}
        {i == len - 1 && (
          <IconButton>
            <AddIcon color="action" onClick={this.add.bind(this)}></AddIcon>
          </IconButton>
        )}
      </div>
    ));
  }
  add() {
    this.setState((prevState) => ({
      education: [...prevState.education, { name: "", start: "", end: "" }],
    }));
  }
  educhange(i, j, e) {
    const value = e.target.value;
    let education = [...this.state.education];
    if (j == 0) education[i] = { ...education[i], ["name"]: value };
    else if (j == 1) education[i] = { ...education[i], ["start"]: value };
    else education[i] = { ...education[i], ["end"]: value };
    this.setState({ education });
  }
  remove(i) {
    let education = [...this.state.education];
    education.splice(i, 1);
    this.setState({ education });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <TextField
              id="standard-basic"
              label="UserName"
              value={this.state.name}
              onChange={this.onChangeUsername}
              required
            />
          </div>
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
            <InputLabel htmlFor="age-native-simple">Role</InputLabel>
            <Select
              native
              value={this.state.role}
              onChange={this.onchangerole}
              required
              inputProps={{
                name: "age",
                id: "age-native-simple",
              }}
            >
              <option value="Job Applicant">Job Applicant</option>
              <option value="Recruiter">Recruiter</option>
            </Select>
          </div>
          {this.state.role == "Recruiter" && (
            <div>
              <div className="form-group">
                {/* <label>Contact No: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.contact}
                  onChange={this.onchangecontact}
                  required
                /> */}
                <TextField
                  id="standard-basic"
                  label="Contact Number"
                  required
                  value={this.state.contact}
                  onChange={this.onchangecontact}
                />
              </div>

              <div className="form-group">
                <TextField
                  id="standard-multiline-flexible"
                  label="Bio"
                  multiline
                  rowsMax={4}
                  value={this.state.bio}
                  required
                  fullWidth
                  onChange={this.onchangebio}
                />
              </div>
            </div>
          )}
          {this.state.role == "Job Applicant" && (
            <div>
              <div className="form-group">
                <InputLabel htmlFor="age-native-simple">Skills</InputLabel>
                <Autocomplete
                  multiple
                  // color="primary"
                  // style={{ color: "white" }}
                  limitTags={5}
                  onChange={this.onchangeskills}
                  id="tags-filled"
                  options={lang.map((option) => option.title)}
                  freeSolo
                  required
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        // color="primary"
                        // style={{ color: "white" }}
                        variant="outlined"
                        label={option}
                        required
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // color="primary"
                      // style={{ color: "white" }}
                      variant="filled"
                      label="Skills"
                      placeholder="Python"
                      fullWidth
                    />
                  )}
                />
              </div>
              {this.create()}
            </div>
          )}

          <div className="form-group">
            <br />
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
const lang = [
  { title: "Python" },
  { title: "C#" },
  { title: "C++" },
  { title: "Reactjs" },
  { title: "Angular" },
  { title: "HTML/CSS" },
  { title: "Java" },
  { title: "Javascript" },
];
