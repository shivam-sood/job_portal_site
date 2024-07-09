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
class active_jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    // this.deletejob = this.deletejob.bind(this);
  }
  deletejob = (param) => (e) => {
    // const nextValue = e.target.value;
    console.log(param);
    const newUser = {
      email: store.getState().email,
      title: param,
    };
    console.log(newUser);
    axios
      .post("http://localhost:4000/deljob", newUser)
      .then((response) => {
        //  console.log(response);
        console.log(response);
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
  componentDidMount() {
    const newUser = {
      email: store.getState().email,
    };
    axios
      .post("http://localhost:4000/active_jobs", newUser)
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
                  <TableCell> Sr No.</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>date of posting</TableCell>
                  <TableCell>No of Positions left</TableCell>
                  <TableCell>No of applications left</TableCell>
                  <TableCell>Deadline</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.map((user, ind) => {
                  return (
                    <TableRow key={ind}>
                      <Link
                        to={{
                          pathname: "/dash",
                          state: {
                            title: user.title,
                          },
                        }}
                      >
                        <TableCell>{ind + 1}</TableCell>
                      </Link>
                      <TableCell>{user.title}</TableCell>
                      <TableCell>{user.date_of_post}</TableCell>
                      <TableCell>
                        <TextField
                          id="standard-basic"
                          label=""
                          required
                          defaultValue={user.positions}
                          //   onChange={this.onchangecontact}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="standard-basic"
                          label=""
                          required
                          defaultValue={user.applications}
                          //   onChange={this.onchangecontact}
                        />
                      </TableCell>

                      <TableCell>
                        <TextField
                          id="standard-basic"
                          label=""
                          required
                          defaultValue={user.deadline}
                          //   onChange={this.onchangecontact}
                        />
                      </TableCell>

                      <TableCell>
                        <Button color="primary">Save</Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          onClick={this.deletejob(user.title)}
                        >
                          Delete
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

export default active_jobs;
