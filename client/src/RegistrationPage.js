/* eslint-disable react-hooks/exhaustive-deps */
import "./Form.scss";
import Box from '@material-ui/core/Box';
import React, { useState, useEffect } from 'react';

function RegistrationPage() {
    const intialValues = { email: "", password: "" };

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
    };

    const validate = (values) => {
        let errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.email) {
            errors.email = "Cannot be blank";
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid email format";
        }

        if (!values.password) {
            errors.password = "Cannot be blank";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
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
            {/* {Object.keys(formErrors).length === 0 && isSubmitting && (
                <span className="success-msg">Form submitted successfully</span>
            )} */}
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
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
                </div>

                <button type="submit">Sign In</button>
            </form>
        </Box>
    );
}

export default RegistrationPage
