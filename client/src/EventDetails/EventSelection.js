/* eslint-disable no-unused-vars */
import React from 'react';
import axios from "axios";
import shortid from 'shortid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TableContainer from '@material-ui/core/TableContainer';
import DialogContentText from '@material-ui/core/DialogContentText';


function createData(name, disabledToggle, breakoutCheckbox, webinarCheckbox) {
  return { name, disabledToggle, breakoutCheckbox, webinarCheckbox };
}

const rows = [
  createData('Global STEM Education Expo (Virtual) - 29th January 2022', true, false, false),
  createData('Global Art & Design Education Expo (In-person) - 1st April 2022, Delhi', true, false, false),
  createData('Global Art & Design Education Expo (In-person) - 2nd April 2022, Mumbai', true, false, false),
  createData('Global Liberal Arts Education Expo (Virtual) - 23rd April 2022', true, false, false),
  createData('Global Business Education Expo (In-person) - 25th June 2022, Mumbai', true, false, false),
  createData('Global Business Education Expo (In-person) - 26th June 2022, Delhi', true, false, false),
  createData('Global Engineering Education Expo (Virtual) - 6th August 2022', true, false, false),
  createData('Global Hospitality Education Expo (In-person) - 24th September 2022, Mumbai', true, false, false),
  createData('Global Hospitality Education Expo (In-person) - 25th September 2022, Delhi', true, false, false),
  createData('Global Art & Design Education Expo (In-person) - 15th October 2022, Kolkata', true, false, false),
  createData('Global Art & Design Education Expo (In-person) - 16th October 2022, Bangalore', true, false, false),
  createData('Global STEM Education Expo (In-person) - 13th November 2022, Mumbai', true, false, false),
  createData('Global STEM Education Expo (In-person) - 14th November 2022, Bangalore', true, false, false),
];

const headCells = [
  { id: 'name', numeric: false, label: 'Event Name' },
  { id: 'expo', numeric: true, label: 'Main Expo' },
  { id: 'breakout', numeric: true, label: 'Breakout Session' },
  { id: 'webinars', numeric: true, label: 'Post-Event Webinar' },
];

function EnhancedTableHead(props) {
  return (
    <TableHead sx={{ pt: 5 }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell sx={{ backgroundColor: 'orange' }} key={headCell.id} align={headCell.id === 'name' ? 'left' : 'center'}>
            <Typography variant="h6">{headCell.label}</Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EventSelection({ paymentMethod, registerUserData, data }) {
  const [selected, setSelected] = React.useState([]);
  const [webinarPrice, setWebinarPrice] = React.useState(0);
  const [breakoutPrice, setBreakoutPrice] = React.useState(0);
  const [wireDetails, setWireDetails] = React.useState(false);
  const [creditError, setCreditError] = React.useState(false);
  const [mainEventPrice, setMainEventPrice] = React.useState(0);

  let newSelected = [];
  const history = useHistory();

  // React.useEffect(() => {
  //   console.log(`breakoutPrice`, breakoutPrice)
  // }, [breakoutPrice])
  // React.useEffect(() => {
  //   console.log(`webinarPrice`, webinarPrice)
  // }, [webinarPrice])
  // React.useEffect(() => {
  //   console.log(`mainEventPrice`, mainEventPrice)
  // }, [mainEventPrice])

  const handleBreakoutPrice = (event, name) => {
    let result = rows.find(obj => {
      return obj.name === name;
    });

    result.breakoutCheckbox = !result.breakoutCheckbox;

    if (result.breakoutCheckbox) {
      setBreakoutPrice(prev => prev + 1);
    } else {
      setBreakoutPrice(prev => prev - 1);
    }
  }

  const handleWebinarPrice = (event, name) => {
    let result = rows.find(obj => {
      return obj.name === name;
    })
    result.webinarCheckbox = !result.webinarCheckbox;
    if (result.webinarCheckbox) {
      setWebinarPrice(prev => prev + 1);
    } else {
      setWebinarPrice(prev => prev - 1);
    }
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let result = rows.find(obj => {
      return obj.name === name;
    });
    result.disabledToggle = !result.disabledToggle;

    if (result.disabledToggle) {
      if (result.webinarCheckbox) {
        setWebinarPrice(prev => prev - 1);
      }
      if (result.breakoutCheckbox) {
        setBreakoutPrice(prev => prev - 1);
      }
      result.webinarCheckbox = false;
      result.breakoutCheckbox = false;
    }

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);

    const newSelectedLength = newSelected.length;
    setMainEventPrice(newSelectedLength);
  };

  const isSelected = (name) => {
    return selected.indexOf(name) !== -1;
  }

  const wireDetail = async () => {
    let orderData = rows.filter((i) => selected.includes(i.name));
    const eventData = orderData.map((i) => ({
      mainEvent: i.name,
      webinar: i.webinarCheckbox,
      breakout: i.breakoutCheckbox,
    }));
    let orders = {
      paymentType: 'wire',
      orderData: eventData,
      userData: registerUserData.data,
    }
    const orderUpdate = await axios.post(`https://signup.zistaeducation.com/order`, orders);
    console.log(orderUpdate);
    if (orderUpdate.data) {
      let mailDataToProcess = {
        userData: orderUpdate.data,
        orderData: orderUpdate.data.eventData,
      }
      history.push('/success');
      const mailData = await axios.post(`https://signup.zistaeducation.com/mail`, mailDataToProcess);
      console.log(mailData);
    } else {
      history.push('/error');
    }
  }

  const handleCloseWireDetails = () => {
    setWireDetails(false);
  }

  const [open, setOpen] = React.useState(false);
  const [emptyCartError, setEmptyCartError] = React.useState(false);

  const handleClickOpen = () => {
    if (mainEventPrice + webinarPrice + breakoutPrice === 0 || mainEventPrice + webinarPrice + breakoutPrice === '0') {
      setEmptyCartError(true);
    } else if (paymentMethod === 'credit' && selected.length > 1) {
      setCreditError(true);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEmptyCart = () => {
    setEmptyCartError(false);
  };

  const handleCloseCreditError = () => {
    setCreditError(false);
  };

  return (
    <div>
      <TableContainer component={Paper} elevation={1} sx={{ backgroundColor: 'whitesmoke', overflow: 'hidden' }}>
        <Table size={'small'}>
          <EnhancedTableHead
            numSelected={selected.length}
            rowCount={rows.length}
          />
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row.name);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.name}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" sx={{ border: 'solid 1px orange' }}>{row.name}</TableCell>
                  <TableCell align="center" sx={{ border: 'solid 1px orange' }}>
                    <Checkbox
                      style={{
                        color: 'orange',
                      }}
                      onChange={(event) => handleClick(event, row.name)}
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ border: 'solid 1px orange' }}>
                    <Checkbox
                      style={{
                        color: !row.disabledToggle ? 'orange' : '',
                      }}
                      checked={row.breakoutCheckbox}
                      disabled={row.disabledToggle}
                      onChange={(event) => handleBreakoutPrice(event, row.name)}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ border: 'solid 1px orange' }}>
                    <Checkbox
                      style={{
                        color: !row.disabledToggle ? 'orange' : '',
                      }}
                      checked={row.webinarCheckbox}
                      disabled={row.disabledToggle}
                      onChange={(event) => handleWebinarPrice(event, row.name)}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center">
        <Button
          sx={{
            width: "300px",
            height: "45px",
            m: "40px",
            backgroundColor: '#EF6C00',
            '&:hover': {
              backgroundColor: '#FB8C00',
              boxShadow: 'none',
            }
          }}
          variant="contained"
          onClick={(event) => handleClickOpen(event)}>
          Submit
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent sx={{ backgroundColor: 'whitesmoke' }}>
          <DialogContentText id="razorpayDialogDescription">
            <Typography variant='h6' p={1} mb={2} sx={{ backgroundColor: '#EF6C00', borderRadius: '5px', color: 'whitesmoke', textAlign: 'center' }}>ORDER SUMMARY</Typography>
            <Paper elevation={0}>
              <Box display='flex' justifyContent='center' flexDirection='column' p={2}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1" sx={{ mr: 3 }}>Main Event Total:</Typography>
                  <Typography variant="body1" color="initial">{mainEventPrice}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1"  sx={{ mr: 3 }}>Breakout Session Total:</Typography>
                  <Typography variant="body1" color="initial">{breakoutPrice}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1"  sx={{ mr: 3 }}>Post Event Webinar Total:</Typography>
                  <Typography variant="body1" color="initial">{webinarPrice}</Typography>
                </Box>
                <Divider sx={{ mt: 1, mb: 1 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1"  sx={{ mr: 3 }}>All Items Total:</Typography>
                  <Typography variant="body1" color="initial">{mainEventPrice + webinarPrice + breakoutPrice}</Typography>
                </Box>
              </Box>
            </Paper>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: '20px', pr: '24px', pl: '24px', backgroundColor: 'whitesmoke' }}>
          <Button onClick={handleClose} variant="contained" color="primary" sx={{
            backgroundColor: '#EF6C00',
            '&:hover': {
              backgroundColor: '#FB8C00',
              boxShadow: 'none',
            }
          }}>
            Cancel
          </Button>
          <Button onClick={wireDetail} variant="contained" color="primary" autoFocus sx={{
            backgroundColor: '#EF6C00',
            '&:hover': {
              backgroundColor: '#FB8C00',
              boxShadow: 'none',
            }
          }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={emptyCartError}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="subtitle2" color="initial">
              You haven't selected any event. Select atleast one event to checkout.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: '20px', pr: '24px', pl: '24px' }}>
          <Button onClick={handleCloseEmptyCart} color="primary" variant="contained" autoFocus sx={{
            backgroundColor: '#EF6C00',
            '&:hover': {
              backgroundColor: '#FB8C00',
              boxShadow: 'none',
            }
          }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={creditError}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="subtitle2" color="initial">
              Since you have selected the credit card payment method, you can now only select one event and less than $2000 due to the Razorpay transaction limits. But if you are willing to select more than one event, kindly choose the wire transfer payment method. Thanks
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: '20px', pr: '24px', pl: '24px' }}>
          <Button onClick={handleCloseCreditError} color="primary" variant="contained" autoFocus sx={{
            backgroundColor: '#EF6C00',
            '&:hover': {
              backgroundColor: '#FB8C00',
              boxShadow: 'none',
            }
          }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={wireDetails}
        onClose={handleClose}
      >
        <DialogContent sx={{ pb: 1 }}>
          <DialogContentText id="alert-dialog-description">
            <Box>
              <Typography sx={{ fontWeight: '600' }} variant="h6" color="initial">Bank Details</Typography>
            </Box>
            <nav aria-label="secondary mailbox folders">
              <List>
                <ListItem disablePadding>
                  <Typography variant="subtitle2" color="initial">
                    Bank Name: Federal Bank
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <Typography variant="subtitle2" color="initial">
                    Company Name: Zista Education Services LLP
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <Typography variant="subtitle2" color="initial">
                    Account Type: Current
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <Typography variant="subtitle2" color="initial">
                    Account Number: 18050200003353
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <Typography variant="subtitle2" color="initial">
                    Branch Name: Ghatkopar
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <Typography variant="subtitle2" color="initial">
                    Branch Address: Gr. Floor, Trikal Co-Op. Housing Society Ltd., 90 Feet Road, Ghatkopar East, Mumbai 400075, Maharashtra, India.
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <Typography variant="subtitle2" color="initial">
                    IFSC Code: FDRL0001805
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <Typography variant="subtitle2" color="initial">
                    SWIFT CODE: FDRLINBBIBD
                  </Typography>
                </ListItem>
              </List>
            </nav>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: '20px', pr: '24px', pl: '24px', pt: 0 }}>
          <Button onClick={handleCloseWireDetails} color="primary" variant="contained" autoFocus sx={{
            backgroundColor: '#EF6C00',
            '&:hover': {
              backgroundColor: '#FB8C00',
              boxShadow: 'none',
            }
          }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
