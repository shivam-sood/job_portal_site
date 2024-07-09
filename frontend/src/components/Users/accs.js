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

class accs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      sortedUsers: [],
      sortname: true,
      sortdate: true,
      sorttitle: true,
      sortrating: true,
    };
    this.renderIcon1 = this.renderIcon1.bind(this);
    this.renderIcon2 = this.renderIcon2.bind(this);
    this.renderIcon3 = this.renderIcon3.bind(this);
    this.renderIcon4 = this.renderIcon4.bind(this);
    this.sortChangename = this.sortChangename.bind(this);
    this.sortChangedate = this.sortChangedate.bind(this);
    this.sortChangetitle = this.sortChangetitle.bind(this);
    this.sortChangerating = this.sortChangerating.bind(this);
  }

  componentDidMount() {
    const newUser = {
      email: store.getState().email,
    };
    axios
      .post("http://localhost:4000/accepted", newUser)
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

  sortChangename() {
    /**
     *      Note that this is sorting only at front-end.
     */
    var array = this.state.users;
    var flag = this.state.sortname;
    array.sort(function (a, b) {
      if (a.name != undefined && b.name != undefined) {
        return (1 - flag * 2) * (a.name - b.name);
      } else {
        return 1;
      }
    });
    this.setState({
      users: array,
      sortname: !this.state.sortname,
    });
  }
  sortChangedate() {
    /**
     *      Note that this is sorting only at front-end.
     */
    var array = this.state.users;
    var flag = this.state.sortdate;
    array.sort(function (a, b) {
      if (a.date != undefined && b.date != undefined) {
        return (1 - flag * 2) * (a.date - b.date);
      } else {
        return 1;
      }
    });
    this.setState({
      users: array,
      sortdate: !this.state.sortdate,
    });
  }
  sortChangetitle() {
    /**
     *      Note that this is sorting only at front-end.
     */
    var array = this.state.users;
    var flag = this.state.sorttitle;
    array.sort(function (a, b) {
      if (a.title != undefined && b.title != undefined) {
        return (1 - flag * 2) * (a.title - b.title);
      } else {
        return 1;
      }
    });
    this.setState({
      users: array,
      sorttitle: !this.state.sorttitle,
    });
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
    if (this.state.sortname) {
      return <ArrowDownwardIcon />;
    } else {
      return <ArrowUpwardIcon />;
    }
  }
  renderIcon2() {
    if (this.state.sortdate) {
      return <ArrowDownwardIcon />;
    } else {
      return <ArrowUpwardIcon />;
    }
  }
  renderIcon3() {
    if (this.state.sorttitle) {
      return <ArrowDownwardIcon />;
    } else {
      return <ArrowUpwardIcon />;
    }
  }
  renderIcon4() {
    if (this.state.sortrating) {
      return <ArrowDownwardIcon />;
    } else {
      return <ArrowUpwardIcon />;
    }
  }

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
                    <TableCell></TableCell>
                    <TableCell>type</TableCell>
                    <TableCell>
                      {" "}
                      <Button onClick={this.sortChangename}>
                        {this.renderIcon1()}
                      </Button>
                      Name
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button onClick={this.sortChangedate}>
                        {this.renderIcon2()}
                      </Button>
                      Date of Joining
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button onClick={this.sortChangetitle}>
                        {this.renderIcon3()}
                      </Button>
                      Title
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button onClick={this.sortChangerating}>
                        {this.renderIcon4()}
                      </Button>
                      Rating
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.users.map((user, ind) => {
                    return (
                      <TableRow key={ind}>
                        <TableCell>{ind + 1}</TableCell>
                        <TableCell>{user.type}</TableCell>
                        <TableCell>{user.name}</TableCell>

                        <TableCell>{user.date_of_joining}</TableCell>
                        <TableCell>{user.title}</TableCell>
                        {/* <TableCell>{user.rating.given}</TableCell> */}
                        <TableCell>{user.duration}</TableCell>
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

export default accs;
