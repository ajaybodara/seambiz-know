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
import { customers } from "../data/mockCompanyCustomer";
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

  const [CustomerData, setCustomerData] = useState(null);
  const [NameData, setNameData] = useState(null);
  const [ExtendednameData, setExtendednameData] = useState(null);
  const [ExtendedsysidData, setExtendedsysidData] = useState(null);
  const [StreetnameData, setStreetnameData] = useState(null);
  const [CitynameData, setCitynameData] = useState(null);
  const [open, setOpen] = React.useState(false);

  const Onformsubmit = () => {
    mock.onPost("/addcustomer").reply(200, {
      id: CustomerData.length + 1,
      name: NameData,
      extended_name: ExtendednameData,
      street: StreetnameData,
      postal_code: 395010,
      city: CitynameData,
      country_iso: "IN",
      ext_system_id: ExtendedsysidData,
      images: [
        {
          path: "http://dummyimage.com/173x203.png/dddddd/000000"
        }
      ]
    });

    if (
      NameData != null &&
      ExtendednameData != null &&
      ExtendedsysidData != null &&
      StreetnameData != null &&
      CitynameData != null
    ) {
      axios.post("/addcustomer").then(function(response) {
        const newcustomer = CustomerData.concat(response.data);
        console.log(newcustomer);
        setCustomerData(CustomerData.concat(response.data));
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
    setExtendednameData(null);
    setExtendedsysidData(null);
    setStreetnameData(null);
    setCitynameData(null);
  };
  useEffect(() => {
    // console.log(customers);
    axios.get(`/customers`).then(function(response) {
      setCustomerData(response.data.customers);
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
          Add New Customer
        </Button>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">extended_name</TableCell>
              <TableCell align="right">ext_system_id</TableCell>
              <TableCell align="right">street</TableCell>
              <TableCell align="right">city</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {CustomerData &&
              CustomerData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.extended_name}</TableCell>
                  <TableCell align="right">{row.ext_system_id}</TableCell>
                  <TableCell align="right">{row.street}</TableCell>
                  <TableCell align="right">{row.city}</TableCell>
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
        <DialogTitle id="form-dialog-title">Add New Customer</DialogTitle>
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
            id="name"
            label="Extended_name"
            type="text"
            fullWidth
            onChange={e => {
              setExtendednameData(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="name"
            label="Ext_system_id"
            type="text"
            fullWidth
            onChange={e => {
              setExtendedsysidData(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="name"
            label="street"
            type="text"
            fullWidth
            onChange={e => {
              setStreetnameData(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="name"
            label="city"
            type="text"
            fullWidth
            onChange={e => {
              setCitynameData(e.target.value);
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
