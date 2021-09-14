/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react';

function RegistrationPage({ history }) {
    const intialValues = { email: "", fName: "", lName: "", instName: "", instAddress: "", phNumber: "", officePhone: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {
        console.log(formValues);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
        history.push(`/event`);
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
        <Box display="flex" justifyContent="center" alignItems="center" flex="1">
            <Paper elevation={1} sx={{ width: '700px', height: '700px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                {Object.keys(formErrors).length === 0 && isSubmitting && (
                    <span className="success-msg">Form submitted successfully</span>
                )}
                <form onSubmit={handleSubmit} noValidate style={{ width: '500px' }}>
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

                    <button type="submit">Submit</button>
                </form>
            </Paper>
        </Box>
    );
}

export default RegistrationPage
