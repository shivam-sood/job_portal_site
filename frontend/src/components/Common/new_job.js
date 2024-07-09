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
export default class new_job extends Component {
  constructor(props) {
    super(props);
    // store.dispatch(logout());\
    this.state = {
      title: "",
      max_app: "",
      max_pos: "",
      deadline: "",
      type: "Full-time",
      duration: "",
      salary: "",
      skills: [],
    };

    this.onchangetitle = this.onchangetitle.bind(this);
    this.onchangemax_app = this.onchangemax_app.bind(this);
    this.onchangemax_pos = this.onchangemax_pos.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onchangedeadline = this.onchangedeadline.bind(this);
    this.onchangetype = this.onchangetype.bind(this);
    this.onchangeduration = this.onchangeduration.bind(this);
    this.onchangesalary = this.onchangesalary.bind(this);
    this.onchangeskills = this.onchangeskills.bind(this);
  }
  onchangeskills(event, values) {
    this.setState({ skills: values });
    console.log(this.state.skills);
  }
  onchangetitle(event) {
    this.setState({ title: event.target.value });
  }
  onchangemax_app(event) {
    this.setState({ max_app: event.target.value });
  }
  onchangemax_pos(event) {
    this.setState({ max_pos: event.target.value });
  }
  onchangedeadline(event) {
    this.setState({ deadline: event.target.value });
  }
  onchangetype(event) {
    this.setState({ type: event.target.value });
  }
  onchangeduration(event) {
    this.setState({ duration: event.target.value });
  }
  onchangesalary(event) {
    this.setState({ salary: event.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.state.title == "" || this.state.title == null) {
      alert("title cant be empty");
      return;
    }
    if (this.state.max_app < 0 || this.state.max_pos < 0) {
      alert("max app and pos cant be negative");
      return;
    }
    if (this.state.salary < 0) {
      alert("Salary cant be negative");
      return;
    }
    if (this.state.duration < 0 || this.state.duration > 6) {
      alert("Duration between 0-6");
      return;
    }
    if (
      (this.state.skills == "" || this.state.skills == null)
    ) {
      alert("Enter skills please.");
      return;
    }

    const newUser = {
      title: this.state.title,
      name: store.getState().name,
      email: store.getState().email,
      max_app: this.state.max_app,
      max_pos: this.state.max_pos,
      deadline: this.state.deadline,
      type: this.state.type,
      duration: this.state.duration,
      salary: this.state.salary,
      skills: this.state.skills,
    };
    axios
      .post("http://localhost:4000/new_job", newUser)
      .then((res) => {
        alert("Registered new job");
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
      title: "",
      max_app: "",
      max_pos: "",
      deadline: "",
      type: "Full-time",
      duration: "",
      salary: "",
      skills: [],
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <TextField
              id="standard-basic"
              label="Title"
              value={this.state.title}
              onChange={this.onchangetitle}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              id="standard-basic"
              label="Max number of applications"
              value={this.state.max_app}
              onChange={this.onchangemax_app}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              id="standard-basic"
              label="Max number of Positions"
              value={this.state.max_pos}
              onChange={this.onchangemax_pos}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              id="datetime-local"
              label="Deadline"
              type="datetime-local"
              value={this.state.deadline}
              onChange={this.onchangedeadline}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </div>
          <div className="form-group">
            <InputLabel htmlFor="age-native-simple">Skills</InputLabel>
            <Autocomplete
              multiple
              // color="primary"
              // style={{ color: "white" }}
              limitTags={5}
              onChange={this.onchangeskills}
              id="tags-filled"
              value={this.state.skills}
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
          <div className="form-group">
            <InputLabel htmlFor="age-native-simple">Type</InputLabel>
            <Select
              native
              value={this.state.type}
              onChange={this.onchangetype}
              required
              inputProps={{
                name: "age",
                id: "age-native-simple",
              }}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Work from Home">Work from Home</option>
            </Select>
          </div>
          <div className="form-group">
            <TextField
              id="standard-basic"
              label="Duration"
              value={this.state.duration}
              onChange={this.onchangeduration}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              id="standard-basic"
              label="Salary"
              value={this.state.salary}
              onChange={this.onchangesalary}
              required
            />
          </div>
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
