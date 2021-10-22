/* eslint-disable no-unused-vars */
import "../App.css";
import "jspdf-autotable";
import axios from "axios";
import jsPDF from "jspdf";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { MdFileDownload } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

function Admin() {
    const intialValues = { email: "", password: "" };
    const [progress, setProgress] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [download, setDownload] = useState(false);
    const [formErrors, setFormErrors] = useState({});
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

    const downloadData = async () => {
        let { data } = await axios.get(`/download`);
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.setTextColor(100);
        const columns = [['First Name', 'Last Name', 'Email', 'Institute Name', 'Institute Address', 'Phone Number', 'Office Ph.No.']];
        let tableData = [];
        for (const user of data.userData) {
            const codeArr = [`${user.fName}`, `${user.lName}`, `${user.email}`, `${user.instName}`, `${user.instAddress}`, `${user.phNumber}`, `${user.officePhone}`, `${user.fName}`];
            tableData.push(codeArr);
        }
        let content = {
            startY: 15,
            head: columns,
            body: tableData
        };

        doc.text("Registered Users Data", 70, 10);
        doc.autoTable(content);
        doc.save('zista-registered-users.pdf');
    }

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

            <Box width="33%" display="flex" flex="1" flexDirection="column" mt={10}>
                <Button disabled={!download} sx={{
                    bgcolor: '#EF6C00',
                    '&:hover': {
                        backgroundColor: '#FB8C00',
                        boxShadow: 'none',
                    },
                }} type="submit" variant="contained" onClick={downloadData}>Download <MdFileDownload />
                </Button>
                <Typography mt={2} variant="subtitle2" color="initial">Click on the download button to download all the users data from DB</Typography>
            </Box>
        </Box>
    )
}

export default Admin
