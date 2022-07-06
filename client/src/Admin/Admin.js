/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "../App.css";
import "jspdf-autotable";
import axios from "axios";
import jsPDF from "jspdf";
import Box from '@material-ui/core/Box';
import React, { useState } from 'react';
import ReactToPrint from "react-to-print";
import CsvDownload from 'react-json-to-csv';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { MdFileDownload } from 'react-icons/md';
import Typography from '@material-ui/core/Typography';


export const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} style={{ width: '100vw', height: '100vh' }}>
      {props.downloadData && (
        <div id="downloadBody">
          {props.downloadData.map((i, index) => {
            return (
              <Paper elevation={0} component={Box} sx={{ backgroundColor: 'whitesmoke', p: '20px', border: '1px solid black', mb: 1 }}>
                <Box>
                  <Typography variant="subtitle1" color="initial" sx={{ fontFamily: 'Exo', fontWeight: '700' }}>Serial No: {index + 1}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" color="initial" sx={{ fontFamily: 'Exo', fontWeight: '700' }}>Email: {i.email}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" color="initial" sx={{ fontFamily: 'Exo', fontWeight: '700' }}>First Name: {i.fName}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" color="initial" sx={{ fontFamily: 'Exo', fontWeight: '700' }}>Last Name: {i.lName}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" color="initial" sx={{ fontFamily: 'Exo', fontWeight: '700' }}>Inst Name: {i.instName}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" color="initial" sx={{ fontFamily: 'Exo', fontWeight: '700' }}>Inst Address: {i.instAddress}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" color="initial" sx={{ fontFamily: 'Exo', fontWeight: '700' }}>Phone No: {i.phNumber}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" color="initial" sx={{ fontFamily: 'Exo', fontWeight: '700' }}>Office No: {i.officePhone}</Typography>
                </Box>
                {i.eventData.length > 0 && (
                  <Box display="flex">
                    <table>
                      <thead>
                        <th style={{ width: 600 }}>Event Name</th>
                        <th style={{ width: 100 }}>Breakout</th>
                        <th style={{ width: 100 }}>Webinar</th>
                      </thead>
                      <tbody>
                        {i.eventData.map((j) => {
                          return (
                            <tr>
                              <td>{j.mainEvent}</td>
                              <td style={{ width: 100, textAlign: 'center' }}>{j.breakout.toString()}</td>
                              <td style={{ width: 100, textAlign: 'center' }}>{j.webinar.toString()}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Box>
                )}
              </Paper>
            )
          })}
        </div>
      )}
    </div>
  );
});

function Admin() {
  const intialValues = { email: "", password: "" };
  const [download, setDownload] = useState(false);
  const [print, setPrint] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [downloadData, setDownloadData] = useState();
  const componentRef = React.useRef();
  const [formValues, setFormValues] = useState(intialValues);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const validate = (values) => {
    let errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.password) {
      errors.password = "Cannot be blank";
    }

    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (values.password && values.email) {
      if (values.email !== 'amit.a@zistaeducation.com' || values.password !== 'amit.a@zistaeducation.com') {
        errors.error = "Email or Password didnot match";
      }
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    if (email === 'amit.a@zistaeducation.com' && password === 'amit.a@zistaeducation.com') {
      setDownload(true);
    } else {
      setFormErrors(validate(formValues));
    }
  };

  const downloadDataEvent = async () => {
    setPrint(true);
  }

  React.useEffect(async () => {
    let { data } = await axios.get(`https://signup.zistaeducation.com/download`);
    let listData = [];
    for (const i of data.userData) {
      listData.push({
        Email: i.email,
        FirstName: i.fName,
        LastName: i.lName,
        InstituteAddress: i.instAddress,
        InstituteName: i.instName,
        PhoneNumber: i.phNumber,
        OfficePhoneNumber: i.officePhone,
        RegistrationDate: i.registrationDate,
        PaymentType: i.paymentType ? i.paymentType : "Not Done",
        EventData: i.eventData ? i.eventData : "Not Selected",
      })
    }
    setDownloadData(listData);
  }, [])

  return (
    <Box sx={{ fontFamily: 'Exo', fontWeight: '700' }} xs={3} height="100vh" backgroundColor="whitesmoke" display="flex" justifyContent="start" alignItems="center" flex="1" flexDirection="column">
      <Box sx={{ fontFamily: 'Exo', fontWeight: '700' }} xs={3} height="100vh" backgroundColor="whitesmoke" display="flex" flex="1" flexDirection="column">
        <Box display="flex" mt={30}>
          <Paper elevation={4} sx={{ p: '0 70px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: 'whitesmoke' }}>
            <Typography mb='10px' mt="10px" variant="h4" color="grey" sx={{ fontFamily: 'Exo', fontWeight: '800' }}>
              Admin Login
            </Typography>
            <form onSubmit={handleSubmit} noValidate style={{ width: '450px', position: 'relative' }}>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className={formErrors.email && "input-error"}
                />
                {formErrors.email && (
                  <span className="error">{formErrors.email}</span>
                )}
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formValues.password}
                  onChange={handleChange}
                  className={formErrors.password && "input-error"}
                />
                {formErrors.password && (
                  <span className="error">{formErrors.password}</span>
                )}
                {formErrors.error && (
                  <span className="error">{formErrors.error}</span>
                )}
              </div>

              <Button sx={{
                mt: '25px',
                mb: '30px',
                bgcolor: '#EF6C00',
                '&:hover': {
                  backgroundColor: '#FB8C00',
                  boxShadow: 'none',
                },
              }} type="submit" variant="contained">Submit</Button>
            </form>
          </Paper>
        </Box>
      </Box>

      {download && (
        <CsvDownload style={{
          backgroundColor:"#EF6C00",
          borderRadius:"6px",
          display:"inline-block",
          cursor:"pointer","color":"#ffffff",
          padding:"6px 24px",
          textDecoration:"none",
          width: "450px",
          height: "41px",
          fontFamily: "Arial",
          fontWeight: "500",
          fontSize: "0.875rem",
          lineHeight: "1.75",
          letterSpacing: "0.02857em",
          textTransform: "uppercase",
          marginBottom: "300px",
          textShadow:"0px 1px 0px #EF6C00",
          }}
          data={downloadData} />
      )}
    </Box>
  )
}

export default Admin
