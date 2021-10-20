import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';

export const rows = [
  {
    id: 1,
    name: '1 Event',
    priceWire: 1500,
    priceCreditCard: 1555,
    breakout: 500,
    postEvent: 350,
  },
  {
    id: 2,
    name: '2 Events',
    priceCreditCard: 3006,
    priceWire: 2900,
  },
  {
    id: 3,
    name: '3 Events',
    priceCreditCard: 4458,
    priceWire: 4300,
  },
  {
    id: 4,
    name: '4 Events',
    priceCreditCard: 5909,
    priceWire: 5700,
  },
  {
    id: 5,
    name: '5 Events',
    priceCreditCard: 7361,
    priceWire: 7100,
  },
  {
    id: 6,
    name: '6 Events',
    priceCreditCard: 8812,
    priceWire: 8500,
  },
  {
    id: 7,
    name: '7 Events',
    priceCreditCard: 10263,
    priceWire: 9900,
  },
  {
    id: 8,
    name: '8 Events',
    priceCreditCard: 11404,
    priceWire: 11000,
  },
  {
    id: 9,
    name: '9 Events',
    priceCreditCard: 12829,
    priceWire: 12375,
  },
  {
    id: 10,
    name: '10 Events',
    priceCreditCard: 14000,
    priceWire: 13750,
  },
];

export default function BasicTable() {

  return (
    <TableContainer component={Paper} elevation={1} sx={{ backgroundColor: 'whitesmoke' }}>
      <Table size={'small'}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} sx={{ backgroundColor: 'orange' }}>
              <Typography variant="h6">Virtual Expo</Typography>
            </TableCell>
            <TableCell align="center" sx={{ backgroundColor: 'orange' }}>
              <Typography variant="h6">Breakout Session</Typography>
            </TableCell>
            <TableCell align="center" sx={{ backgroundColor: 'orange' }}>
              <Typography variant="h6">Post-Event Lead Nurturing Webinar</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={'1stRow'}>
            <TableCell component="th" scope="row" sx={{ border: 'solid 1px orange' }}>
            </TableCell>
            <TableCell component="th" scope="row" sx={{ border: 'solid 1px orange' }}>
              <Typography variant="body1" color="initial">Pay Via Wire Transfer</Typography>
            </TableCell>
            <TableCell component="th" scope="row" sx={{ border: 'solid 1px orange' }}>
              <Typography variant="body1" color="initial">Pay Via Credit Card</Typography>
            </TableCell>
            {true && (<TableCell rowSpan={11} align="center" sx={{ border: '1px solid orange'}}>
                <Box>
                  <Typography variant="subtitle2" color="initial">$500 per expo (pay via wire transfer)</Typography>
                  <Typography variant="subtitle2" color="initial">$ 518 per expo   (   pay via credit   card   )</Typography>
                </Box>
              </TableCell>)}
              {true && (<TableCell rowSpan={11} align="center" sx={{ borderBottom: '1px solid orange' }}>
                <Box>
                  <Typography variant="subtitle2" color="initial">$300 per expo(pay via wire transfer)</Typography>
                  <Typography variant="subtitle2" color="initial">$ 363 per expo ( pay via credit card )</Typography>
                </Box>
              </TableCell>)}
          </TableRow>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" sx={{ border: 'solid 1px orange' }}>
                <Typography variant="subtitle2" color="initial">{row.name}</Typography>
              </TableCell>
              <TableCell component="th" scope="row" sx={{ border: 'solid 1px orange' }}>
                <Typography variant="subtitle2" color="initial">$ {row.priceWire}</Typography>
              </TableCell>
              <TableCell component="th" scope="row" sx={{ border: 'solid 1px orange' }}>
                <Typography variant="subtitle2" color="initial">$ {row.priceCreditCard}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}