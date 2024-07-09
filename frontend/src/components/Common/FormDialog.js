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
import { store } from "../../store/store";
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState("free");
  const [sop, setSop] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onchangesop = (event) => {
    setSop(event.target.value);
  };
  useEffect(() => {
    const newUser = {
      title: props.job.title,
      recruiter_email: props.job.email,
      applicant_email: store.getState().email,
    };
    axios
      .post("http://localhost:4000/check", newUser)
      .then((res) => {
        console.log(res.data.error);
        setState(res.data.error);
      })
      .catch(function (err) {
        console.log(err.error);
      })
      .then(function () {
        // setState()
      });
  });
  const submit = () => {
    const newUser = {
      title: props.job.title,
      name: props.job.name,
      salary: props.job.salary,
      recruiter_email: props.job.email,
      applicant_email: store.getState().email,
      applicant_name: store.getState().name,
      sop: { sop },
      type: props.job.type,
    };
    axios
      .post("http://localhost:4000/new_application", newUser)
      .then((res) => {
        alert("Application added");
      })
      .catch(function (err) {
        alert("Error:" + err.response.data.error);
      })
      .then(function () {});
    setOpen(false);
  };

  return (
    <div>
      {state == "free" && (
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Apply
        </Button>
      )}
      {state == "Applied" && (
        <Button
          variant="outlined"
          disabled
          color="secondary"
          onClick={handleClickOpen}
        >
          Applied
        </Button>
      )}
      {state == "full" && (
        <Button
          variant="outlined"
          disabled
          color="secondary"
          style={{
            borderColor: "red",
            color: "red",
          }}
          onClick={handleClickOpen}
        >
          Full
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Apply</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* {props.job._id} */}
            To apply for this job, please enter your SOP here.
          </DialogContentText>
          <TextField
            id="standard-multiline-flexible"
            label="sop"
            multiline
            rowsMax={4}
            value={sop}
            required
            fullWidth
            onChange={onchangesop}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            <Link to="/joblist" className="nav-link">
              Apply
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
