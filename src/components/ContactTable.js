import React, { useEffect, useState } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { contacts } from "../data/mockCustomerContact";
import axios from "axios";
import { mock } from "../util/mockAdapter";

const CustomerTable = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 650
    }
  }));

  const [ContactData, setContactData] = useState(null);
  const [NameData, setNameData] = useState(null);
  const [NumberData, setNumberData] = useState(null);
  const [EmaildData, setEmailData] = useState(null);

  const [open, setOpen] = React.useState(false);

  const Onformsubmit = () => {
    mock.onPost("/addcontact").reply(200, {
      id: ContactData.length + 1,
      name: NameData,
      number: NumberData,
      email: EmaildData
    });
    if (NameData != null && NumberData != null && EmaildData != null) {
      axios.post("/addcontact").then(function(response) {
        const newcustomer = ContactData.concat(response.data);
        console.log(newcustomer);
        setContactData(ContactData.concat(response.data));
      });
      handleClose();
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNameData(null);
    setNumberData(null);
    setEmailData(null);
  };
  useEffect(() => {
    axios.get(`/api/c/${2}/customer/${3}/contact`).then(function(response) {
      setContactData(response.data.contacts);
      console.log(response.data);
    });
  }, []);
  const classes = useStyles();
  return (
    <div className="App">
      <Paper
        className={classes.root}
        style={{ width: "90%", marginLeft: "5%" }}
      >
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add New Contact
        </Button>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">number</TableCell>
              <TableCell align="right">email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ContactData &&
              ContactData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.number}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={e => {
              setNameData(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="number"
            label="number"
            type="text"
            fullWidth
            onChange={e => {
              setNumberData(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="email"
            label="Ext_system_id"
            type="email"
            fullWidth
            onChange={e => {
              setEmailData(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={Onformsubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomerTable;
