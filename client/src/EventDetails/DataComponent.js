import React from 'react';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography'
import TableContainer from '@material-ui/core/TableContainer';

export const rows = [
    {   
        id: 1,
        name: '1 Event',
        price: 1500,
        breakout: 500,
        postEvent: 350,
    },
    {
        id: 2,
        name: '2 Events',
        price: 2900
    },
    {
        id: 3,
        name: '3 Events',
        price: 4300
    },
    {
        id: 4,
        name: '4 Events',
        price: 5700
    },
    {
        id: 5,
        name: '5 Events',
        price: 7100
    },
    {
        id: 6,
        name: '6 Events',
        price: 8500
    },
    {
        id: 7,
        name: '7 Events',
        price: 9900
    },
    {
        id: 8,
        name: '8 Events',
        price: 11000
    },
    {
      id: 9,
      name: '9 Events',
      price: 12375
    },
    {
      id: 10,
      name: '10 Events',
      price: 13750
  },
];

export default function BasicTable() {

  return (
    <TableContainer component={Paper} elevation={1} sx={{backgroundColor: 'whitesmoke'}}>
      <Table size={'small'}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
                <Typography variant="h6">Virtual Expo</Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="h6">Breakout Session</Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="h6">Post-Event Lead Nurturing Webinar</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" sx={{ borderRight: 'solid 1px #DCDCDC' }}>{row.name}</TableCell>
              <TableCell component="th" scope="row" sx={{ borderRight: 'solid 1px #DCDCDC' }}>$ {row.price}</TableCell>
              {row.breakout && (<TableCell rowSpan={10} align="center" sx={{ borderRight: 'solid 1px #DCDCDC' }}>$ {row.breakout} per event</TableCell>)}
              {row.postEvent && (<TableCell rowSpan={10} align="center">$ {row.postEvent} per event</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}