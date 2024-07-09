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
import { store } from "../../store/store";
import ReactStars from "react-rating-stars-component";
class myapplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      sortedUsers: [],
    };
    this.ratingChanged = this.ratingChanged.bind(this);
  }

  componentDidMount() {
    const newUser = {
      email: store.getState().email,
    };
    axios
      .post("http://localhost:4000/myapplications", newUser)
      .then((response) => {
        //  console.log(response);
        this.setState({
          users: response.data,
          sortedUsers: response.data,
          searchText: "",
        });
        console.log("SA");
        console.log(response.data);
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

  ratingChanged = (newRating) => {
    console.log(newRating);
    const newUser = {
      email: this.state.users.recruiter_email,
      title: this.state.users.title,
      value: newRating,
    };
    axios
      .post("http://localhost:4000/jobrating", newUser)
      .then((response) => {
        //  console.log(response);
        this.setState({
          users: response.data,
          sortedUsers: response.data,
          searchText: "",
        });
        console.log("SA");
        console.log(response.data);
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
  };

  render() {
    // const options = {
    //   keys: ["title"],
    // };
    // const fuse = new Fuse(this.state.users, options);
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={9} lg={9}>
            <Paper>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell> Sr No.</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Date of joining</TableCell>
                    <TableCell>Salary </TableCell>
                    <TableCell>name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.users.map((user, ind) => {
                    if (user.status == "Accepted")
                      return (
                        <TableRow key={ind}>
                          <TableCell>{ind + 1}</TableCell>
                          <TableCell>{user.title}</TableCell>
                          <TableCell>{user.date_of_joining}</TableCell>
                          <TableCell>{user.salary}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.status}</TableCell>
                          <TableCell>
                            <ReactStars
                              count={5}
                              onChange={this.ratingChanged}
                              size={24}
                              activeColor="#ffd700"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    else {
                      return (
                        <TableRow key={ind}>
                          <TableCell>{ind + 1}</TableCell>
                          <TableCell>{user.title}</TableCell>
                          <TableCell>{user.date_of_joining}</TableCell>
                          <TableCell>{user.salary}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.status}</TableCell>
                        </TableRow>
                      );
                    }
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

export default myapplications;
