import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import TableCell from "@material-ui/core/TableCell";
import { store } from "../../store/store";

export default function Cmp(props) {
  const [state, setState] = React.useState([]);
  const [state2, setState2] = React.useState([
    {
      name: "",
      start: "",
      end: "",
    },
  ]);
  const [state3, setState3] = React.useState({
    given: "",
    total: "",
  });
  useEffect(() => {
    const newUser = {
      email: props.usr,
    };
    axios
      .post("http://localhost:4000/dash2", newUser)
      .then((res) => {
        console.log("res.data");
        console.log(res.data);
        setState(res.data.skills);
        setState2(res.data.education);
        // setState2(res.data.education);
        setState3(res.data.rating);
      })
      .catch(function (err) {
        console.log(err.error);
      })
      .then(function () {
        // setState()
      });
  }, []);

  return (
    <div>
      <TableCell>
        {state2.map((data, index) => {
          {
            return (
              <div>
                {data.name} {data.start} {data.end}
              </div>
            );
          }
        })}
      </TableCell>
      <TableCell>{state}</TableCell>
      <TableCell>{state3.given}</TableCell>
    </div>
  );
}
