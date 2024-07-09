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
import { store } from "../../store/store";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cmp from "../Common/Cmp";
class dash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      title: "",
    };
    this.statusshortlist = this.statusshortlist.bind(this);
    this.statusaccept = this.statusaccept.bind(this);
    this.statusreject = this.statusreject.bind(this);
  }

  componentDidMount() {
    var title = "";
    if (this.props.location.state) title = this.props.location.state.title;
    console.log(title);
    this.setState({ title: title });
    const newUser = {
      email: store.getState().email,
      title: title,
    };
    axios
      .post("http://localhost:4000/dash", newUser)
      .then((response) => {
        //  console.log(response);
        this.setState({
          users: response.data,
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
  statusshortlist() {
    const newUser = {
      email: store.getState().email,
      title: this.state.title,
    };
    axios
      .post("http://localhost:4000/statusshortlist", newUser)
      .then((response) => {
        //  console.log(response);
        this.setState({
          users: response.data,
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
    axios
      .post("http://localhost:4000/dash", newUser)
      .then((response) => {
        //  console.log(response);
        this.setState({
          users: response.data,
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
  statusaccept() {
    const newUser = {
      email: store.getState().email,
      title: this.state.title,
    };
    axios
      .post("http://localhost:4000/statusaccept", newUser)
      .then((response) => {
        //  console.log(response);
        this.setState({
          users: response.data,
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
    axios
      .post("http://localhost:4000/dash", newUser)
      .then((response) => {
        //  console.log(response);
        this.setState({
          users: response.data,
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
  statusreject() {
    const newUser = {
      email: store.getState().email,
      title: this.state.title,
    };
    axios
      .post("http://localhost:4000/statusreject", newUser)
      .then((response) => {
        //  console.log(response);
        this.setState({
          users: response.data,
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
    axios
      .post("http://localhost:4000/dash", newUser)
      .then((response) => {
        //  console.log(response);
        this.setState({
          users: response.data,
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

  render() {
    // const options = {
    //   keys: ["title"],
    // };
    // const fuse = new Fuse(this.state.users, options);
    return (
      <div>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Stage</TableCell>
                  <TableCell>Date of Application</TableCell>
                  <TableCell>SOP</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Education</TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.map((user, ind) => {
                  return (
                    <TableRow key={ind}>
                      <TableCell>{ind + 1}</TableCell>
                      <TableCell>{user.status}</TableCell>
                      <TableCell>{user.date_of_application}</TableCell>
                      <TableCell>{user.sop}</TableCell>
                      <TableCell>{user.applicant_name}</TableCell>
                      {/* <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell> */}
                      <Cmp usr={user.applicant_email}></Cmp>
                      <TableCell>
                        {user.status == "Applied" && (
                          <Button
                            onClick={this.statusshortlist}
                            color="primary"
                          >
                            Shortlist
                          </Button>
                        )}
                        {user.status == "Shortlisted" && (
                          <Button onClick={this.statusaccept} color="primary">
                            Accept
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button onClick={this.statusreject} color="primary">
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default dash;
