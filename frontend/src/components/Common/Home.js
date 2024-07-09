import React, { Component } from "react";
import axios from "axios";
import { store } from "../../store/store";
import Navbar from "../templates/Navbar";
var string = "MyString";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_role: store.getState().role,
    };
    store.subscribe(() => {
      this.setState({ cur_role: store.getState().role });
    });
  }

  // render -> constructor -> (1st called) ComponentDidMount -> ComponentDidUpdate -> ComponentWillUnmount

  render() {
    // const x = store.getState();

    return <div>You are a {this.state.cur_role}!</div>;
  }
}
