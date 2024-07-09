import React, { Component } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import FormDialog from "../Common/FormDialog";
class joblist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      sortedUsers: [],
      sortrating: true,
      sortsalary: true,
      sortduration: true,
      title: "",
      mn: "",
      mx: "",
      type: "",
      duration: "7",
      status: [],
    };
    this.renderIcon1 = this.renderIcon1.bind(this);
    this.onchangetitle = this.onchangetitle.bind(this);
    this.renderIcon2 = this.renderIcon2.bind(this);
    this.renderIcon3 = this.renderIcon3.bind(this);
    this.sortChangesalary = this.sortChangesalary.bind(this);
    this.sortChangeduration = this.sortChangeduration.bind(this);
    this.sortChangerating = this.sortChangerating.bind(this);
    this.onchangemn = this.onchangemn.bind(this);
    this.onchangemx = this.onchangemx.bind(this);
    this.onchangetype = this.onchangetype.bind(this);
    this.onchangeduration = this.onchangeduration.bind(this);
  }
  onchangeduration(event) {
    this.setState({ duration: event.target.value });
  }
  onchangetype(event) {
    this.setState({ type: event.target.value });
  }
  onchangemn(event) {
    if (event.target.value) {
      this.setState({ mn: event.target.value });
      // console.log(value.title);
    } else {
      this.setState({ mn: "" });
    }
  }
  onchangemx(event) {
    if (event.target.value) {
      this.setState({ mx: event.target.value });
      // console.log(value.title);
    } else {
      this.setState({ mx: "" });
    }
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/joblist")
      .then((response) => {
        //  console.log(response);
        this.setState({
          users: response.data,
          sortedUsers: response.data,
          searchText: "",
        });
        // const status = response.data.map(function (user) {

        //   return user._id;
        // });
        // console.log(status);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        //  console.log("errorrrr");
      });
  }

  sortChangesalary() {
    /**
     *      Note that this is sorting only at front-end.
     */
    var array = this.state.users;
    var flag = this.state.sortsalary;
    array.sort(function (a, b) {
      if (a.salary != undefined && b.salary != undefined) {
        return (1 - flag * 2) * (a.salary - b.salary);
      } else {
        return 1;
      }
    });
    this.setState({
      users: array,
      sortsalary: !this.state.sortsalary,
    });
  }
  sortChangeduration() {
    /**
     *      Note that this is sorting only at front-end.
     */
    var array = this.state.users;
    var flag = this.state.sortduration;
    array.sort(function (a, b) {
      if (a.duration != undefined && b.duration != undefined) {
        return (1 - flag * 2) * (a.duration - b.duration);
      } else {
        return 1;
      }
    });
    this.setState({
      users: array,
      sortduration: !this.state.sortduration,
    });
  }
  onchangetitle(event, value) {
    if (value) {
      this.setState({ title: value.title });
      console.log(value.title);
    } else {
      this.setState({ title: "" });
    }
  }

  sortChangerating() {
    /**
     *      Note that this is sorting only at front-end.
     */
    var array = this.state.users;
    var flag = this.state.sortrating;
    array.sort(function (a, b) {
      if (a.rating.given != undefined && b.rating.given != undefined) {
        return (1 - flag * 2) * (a.rating.given - b.rating.given);
      } else {
        return 1;
      }
    });
    this.setState({
      users: array,
      sortrating: !this.state.sortrating,
    });
  }

  renderIcon1() {
    if (this.state.sortsalary) {
      return <ArrowDownwardIcon />;
    } else {
      return <ArrowUpwardIcon />;
    }
  }
  renderIcon2() {
    if (this.state.sortrating) {
      return <ArrowDownwardIcon />;
    } else {
      return <ArrowUpwardIcon />;
    }
  }
  renderIcon3() {
    if (this.state.sortduration) {
      return <ArrowDownwardIcon />;
    } else {
      return <ArrowUpwardIcon />;
    }
  }

  customFunction(e) {
    console.log(e.target.value);
    this.setState({
      searchText: e.target.value,
    });
  }

  render() {
    // const options = {
    //   keys: ["title"],
    // };
    // const fuse = new Fuse(this.state.users, options);
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={3} lg={3}>
            <List component="nav" aria-label="mailbox folders">
              <ListItem text>
                <h3>Filters</h3>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <List component="nav" aria-label="mailbox folders">
              <TextField
                id="standard-basic"
                label="Search"
                fullWidth={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                // onChange={customFunction}
              />
            </List>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={3} lg={3}>
            <List component="nav" aria-label="mailbox folders">
              <ListItem button>
                <form noValidate autoComplete="off">
                  <label>Salary</label>
                  <TextField
                    id="standard-basic"
                    label="Enter Min"
                    value={this.state.mn}
                    onChange={this.onchangemn}
                    fullWidth={true}
                  />
                  <TextField
                    id="standard-basic"
                    label="Enter Max"
                    value={this.state.mx}
                    onChange={this.onchangemx}
                    fullWidth={true}
                  />
                </form>
              </ListItem>
              <Divider />
              <ListItem button divider>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.state.users}
                  onChange={this.onchangetitle}
                  // value={this.title}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Title"
                      variant="outlined"
                    />
                  )}
                />
              </ListItem>
              <ListItem button divider>
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
                  <option value=""></option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Work from Home">Work from Home</option>
                </Select>
              </ListItem>
              <ListItem button divider>
                <InputLabel htmlFor="age-native-simple">Duration</InputLabel>
                <Select
                  native
                  value={this.state.duration}
                  onChange={this.onchangeduration}
                  required
                  inputProps={{
                    name: "age",
                    id: "age-native-simple",
                  }}
                >
                  <option value="7">7</option>
                  <option value="6">6</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </Select>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <Paper>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell> Sr No.</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Recruiter Name</TableCell>
                    <TableCell>Deadline</TableCell>
                    <TableCell>
                      {" "}
                      <Button onClick={this.sortChangesalary}>
                        {this.renderIcon1()}
                      </Button>
                      Salary
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button onClick={this.sortChangerating}>
                        {this.renderIcon2()}
                      </Button>
                      Job rating
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button onClick={this.sortChangeduration}>
                        {this.renderIcon3()}
                      </Button>
                      Duration
                    </TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.users.map((user, ind) => {
                    if (
                      (!this.state.title || this.state.title == user.title) &&
                      Date.now() < new Date(user.deadline) &&
                      (!this.state.mn || user.salary > this.state.mn) &&
                      (!this.state.mx || user.salary < this.state.mx) &&
                      (this.state.type == "" || this.state.type == user.type) &&
                      this.state.duration > user.duration
                    )
                      return (
                        <TableRow key={ind}>
                          <TableCell>{ind + 1}</TableCell>
                          <TableCell>{user.title}</TableCell>
                          <TableCell>{user.name}</TableCell>
                        
                          <TableCell>{user.deadline}</TableCell>
                          <TableCell>{user.salary}</TableCell>
                          <TableCell>{user.rating.given}</TableCell>
                          <TableCell>{user.duration}</TableCell>
                          <TableCell>{user.type}</TableCell>
                          <TableCell>
                            <FormDialog job={user}></FormDialog>
                          </TableCell>
                        </TableRow>
                      );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default joblist;
