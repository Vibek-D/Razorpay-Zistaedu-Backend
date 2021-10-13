/* eslint-disable react-hooks/exhaustive-deps */
import "../App.css";
import axios from "axios";
import logo from '../logo.png';
import Box from '@material-ui/core/Box';
import AuthRegister from "../AuthRegister";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

function RegistrationPage({ history }) {
    const intialValues = { email: "", fName: "", lName: "", instName: "", instAddress: "", phNumber: "", officePhone: "" };
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [progress, setProgress] = useState(false);
    const [formValues, setFormValues] = useState(intialValues);

    const submit = async () => {
        await axios.post(`/submit`, formValues)
            .then(response => {
                console.log(response);
                AuthRegister.registerUserData = response;
                setTimeout(function () {
                    AuthRegister.login(() => {
                        history.push("/event");
                    });
                }, 2500);
            });
        await axios.post(`/mail`, formValues)
            .then((response) => {
                console.log(response);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
    };

    const validate = (values) => {
        let errors = {};
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regexPhone = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

        if (!values.officePhone) {
            errors.officePhone = "Cannot be blank";
        } else if (!regexPhone.test(values.officePhone)) {
            errors.officePhone = "Invalid number format";
        }

        if (!values.email) {
            errors.email = "Cannot be blank";
        } else if (!regexEmail.test(values.email)) {
            errors.email = "Invalid email format";
        }

        if (!values.phNumber) {
            errors.phNumber = "Cannot be blank";
        } else if (!regexPhone.test(values.phNumber)) {
            errors.phNumber = "Invalid number format";
        }

        if (values.fName === '') {
            errors.fname = "Cannot be blank";
        }

        if (values.lName === '') {
            errors.lname = "Cannot be blank";
        }

        if (!values.instName) {
            errors.instName = "Cannot be blank";
        }

        if (!values.instAddress) {
            errors.instAddress = "Cannot be blank";
        }

        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit();
            setIsSubmitting(false);
        }
    }, [formErrors, isSubmitting]);

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            setProgress(true);
        }
    }, [formErrors, isSubmitting]);

    return (
        <>
            <Box sx={{ fontFamily: 'Exo', fontWeight: '700' }} xs={3} overflow="hidden" height="100vh" backgroundColor="#FFD580" display="flex" justifyContent="start" alignItems="center" flex="1" flexDirection="column">
                {console.log(`progress`, progress)}
                {progress ? (
                    <Box display="flex" justifyContent="center" alignItems="center" position="absolute" zIndex="100" top="50vh">
                        <CircularProgress color="primary" />
                    </Box>
                ) : ''}
                <Box display="flex" mb={3} mt={3}>
                    <Box display='flex' justifyContent="center" backgroundColor="black" borderRadius="20px">
                        <img style={{ marginLeft: '15px' }} src={logo} alt="Logo" />
                    </Box>
                    <Typography variant="h3" color="initial" sx={{ fontFamily: 'Exo', fontWeight: '800', mt: '5px', ml: '5px' }}>
                        REGISTER FOR ZISTA EVENTS
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                    <Paper elevation={4} sx={{ p: '0 70px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: 'whitesmoke' }}>
                        <Typography mb='10px' mt="10px" variant="h3" color="grey" sx={{ fontFamily: 'Exo', fontWeight: '800' }}>
                            Registration Form
                        </Typography>
                        {progress ? (
                            <span style={{ fontFamily: 'Exo' }} className="success-msg">Form submitted successfully</span>
                        ) : ''}
                        <form onSubmit={handleSubmit} noValidate style={{ width: '450px', position: 'relative' }}>
                            <div className="form-row">
                                <label htmlFor="instName">Institution Name</label>
                                <input
                                    type="instName"
                                    name="instName"
                                    id="instName"
                                    value={formValues.instName}
                                    onChange={handleChange}
                                    className={formErrors.instName && "input-error"}
                                />
                                {formErrors.instName && (
                                    <span className="error">{formErrors.instName}</span>
                                )}
                            </div>

                            <div className="form-row">
                                <label htmlFor="instAddress">Institution Address</label>
                                <input
                                    type="instAddress"
                                    name="instAddress"
                                    id="instAddress"
                                    value={formValues.instAddress}
                                    onChange={handleChange}
                                    className={formErrors.instAddress && "input-error"}
                                />
                                {formErrors.instAddress && (
                                    <span className="error">{formErrors.instAddress}</span>
                                )}
                            </div>

                            <div className="form-row">
                                <label htmlFor="fName">First Name</label>
                                <input
                                    type="fName"
                                    name="fName"
                                    id="fName"
                                    value={formValues.fName}
                                    onChange={handleChange}
                                    className={formErrors.fName && "input-error"}
                                />
                                {formErrors.fName && (
                                    <span className="error">{formErrors.fName}</span>
                                )}
                            </div>

                            <div className="form-row">
                                <label htmlFor="lName">Last Name</label>
                                <input
                                    type="lName"
                                    name="lName"
                                    id="lName"
                                    value={formValues.lName}
                                    onChange={handleChange}
                                    className={formErrors.lName && "input-error"}
                                />
                                {formErrors.lName && (
                                    <span className="error">{formErrors.lName}</span>
                                )}
                            </div>

                            <div className="form-row">
                                <label htmlFor="email">Email ID</label>
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
                                <label htmlFor="phNumber">Phone Number</label>
                                <input
                                    type="phNumber"
                                    name="phNumber"
                                    id="phNumber"
                                    value={formValues.phNumber}
                                    onChange={handleChange}
                                    className={formErrors.phNumber && "input-error"}
                                />
                                {formErrors.phNumber && (
                                    <span className="error">{formErrors.phNumber}</span>
                                )}
                            </div>

                            <div className="form-row">
                                <label htmlFor="officePhone">Office Phone</label>
                                <input
                                    type="officePhone"
                                    name="officePhone"
                                    id="officePhone"
                                    value={formValues.officePhone}
                                    onChange={handleChange}
                                    className={formErrors.officePhone && "input-error"}
                                />
                                {formErrors.officePhone && (
                                    <span className="error">{formErrors.officePhone}</span>
                                )}
                            </div>

                            <Button sx={{
                                mt: '25px',
                                mb: '50px',
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
        </>
    );
}

export default RegistrationPage
