/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import axios from "axios";
import logo from './logo.png';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography'

function RegistrationPage({ history }) {
    const intialValues = { email: "", fName: "", lName: "", instName: "", instAddress: "", phNumber: "", officePhone: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {
        console.log(formValues);
        axios.post('/submit', formValues)
        .then(response => {
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
        // setTimeout(function () {
        //     history.push(`/event`);;
        // }, 2000);
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
        }
    }, [formErrors, isSubmitting]);

    return (
        <Box sx={{ fontFamily: 'Exo', fontWeight: '700' }} backgroundColor="#fafad2" height="100%" display="flex" justifyContent="center" alignItems="center" flex="1" flexDirection="column">
            <Box>
                <Paper elevation={0} sx={{ width: '100vw', height: '100px', mb: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#fafad2' }}>
                    <Box display="flex">
                        <Box display='flex' width="330px" justifyContent="center" backgroundColor="black" borderRadius="20px">
                            <img style={{ marginLeft: '15px' }} src={logo} alt="Logo" />
                        </Box>
                        <Typography variant="h3" color="initial" sx={{ fontFamily: 'Exo', fontWeight: '800', mt: '10px', ml: '20px' }}>
                            REGISTER FOR ZISTA EVENTS
                        </Typography>
                    </Box>
                </Paper>
            </Box>
            <Box display="flex" justifyContent="center" width="100%" height="100%">
                <Paper elevation={4} sx={{ width: '700px', height: '800px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#FFECB3' }}>
                    <Typography mb='30px' mt="40px" variant="h3" color="grey" sx={{ fontFamily: 'Exo', fontWeight: '800' }}>Registration Form</Typography>
                    {Object.keys(formErrors).length === 0 && isSubmitting && (
                        <span style={{ fontFamily: 'Exo' }} className="success-msg">Form submitted successfully</span>
                    )}
                    <form onSubmit={handleSubmit} noValidate style={{ width: '500px', position: 'relative' }}>
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
                            mb: '70px',
                            mt: '30px',
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
    );
}

export default RegistrationPage
