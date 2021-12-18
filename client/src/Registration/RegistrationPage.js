/* eslint-disable react-hooks/exhaustive-deps */
import "../App.css";
import axios from "axios";
import logo from '../logo.png';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import { IconContext } from "react-icons";
import AuthRegister from "../AuthRegister";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiAlert from '@material-ui/core/Alert';
import { MdSwitchAccount } from 'react-icons/md';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import ListItem from '@material-ui/core/ListItem';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { CircularProgress, Tooltip } from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RegistrationPage({ history }) {
    const intialValues = { email: "", fName: "", lName: "", instName: "", instAddress: "", phNumber: "", officePhone: "", termsToggle: false };
    const [formErrors, setFormErrors] = useState({});
    const [progress, setProgress] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [termsClick, setTermsClick] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formValues, setFormValues] = useState(intialValues);
    const [handleSubmitCheck, setHandleSubmitCheck] = useState(false);
    const [state, setState] = React.useState({
        vertical: 'bottom',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;

    const submit = async () => {
        await axios.post(`https://signup.zistaeducation.com/submit`, formValues)
            .then(response => {
                AuthRegister.registerUserData = response;
                setTimeout(function () {
                    AuthRegister.login(() => {
                        history.push("/event");
                    });
                }, 2500);
            });
        console.log(formValues);
        await axios.post(`https://signup.zistaeducation.com/mail`, formValues)
            .then((response) => {
                console.log(response);
            });
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        console.log(name, value)
        if (name === 'termsToggle') {
            value = true;
            setFormValues({ ...formValues, [name]: value });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setHandleSubmitCheck(true);
        setFormErrors(validate(formValues));
        console.log(formErrors);
        console.log(formValues);
        if (Object.keys(formErrors).length === 0) {
            setIsSubmitting(true);
        }
    };

    const termsLinkClick = (e) => {
        setTermsClick(true);
    }

    const termsClose = () => {
        setTermsClick(false);
    };

    const validate = (values) => {
        let errors = {};
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.officePhone) {
            errors.officePhone = "Cannot be blank";
        }

        if (!values.email) {
            errors.email = "Cannot be blank";
        } else if (!regexEmail.test(values.email)) {
            errors.email = "Invalid email format";
        }

        if (!values.phNumber) {
            errors.phNumber = "Cannot be blank";
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

        if (!values.termsToggle) {
            errors.termsToggle = "Please agree to the terms & conditions to continue";
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

    useEffect(() => {
        if (handleSubmitCheck && formErrors.termsToggle && Object.keys(formErrors).length === 1) {
            setSnackbar(true);
        }
    }, [handleSubmitCheck, formErrors]);

    const handleClose = () => {
        setSnackbar(false);
    };

    const switchAdminPanel = () => {
        history.push("/admin");
    }

    return (
        <Box sx={{ fontFamily: 'Exo', fontWeight: '700' }} xs={3} height="100vh" backgroundColor="whitesmoke" display="flex" justifyContent="start" alignItems="center" flex="1" flexDirection="column">
            <Box sx={{ fontFamily: 'Exo', fontWeight: '700' }} xs={3} height="100vh" backgroundColor="whitesmoke" display="flex" justifyContent="start" alignItems="center" flex="1" flexDirection="column">
                {progress ? (
                    <Box display="flex" justifyContent="center" alignItems="center" position="absolute" zIndex="100" top="50vh">
                        <CircularProgress color="primary" />
                    </Box>
                ) : ''}
                <Box display="flex" mb={2} mt={2}>
                    <Box display='flex' justifyContent="center" backgroundColor="black" borderRadius="20px">
                        <img style={{ marginLeft: '15px' }} src={logo} alt="Logo" />
                    </Box>
                    <IconContext.Provider value={{ color: "black", className: "global-class-name", size: "2.5rem" }}>
                        <Tooltip title="Admin Panel" placement="bottom" arrow>
                            <Box sx={{ cursor: 'pointer' }} position="absolute" right="70px" onClick={() => switchAdminPanel()}>
                                <MdSwitchAccount />
                            </Box>
                        </Tooltip>
                    </IconContext.Provider>
                </Box>
                <Box display="flex" justifyContent="center">
                    <Paper elevation={4} sx={{ p: '0 70px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: 'whitesmoke' }}>
                        <Typography mb='10px' mt="10px" variant="h4" color="grey" sx={{ fontFamily: 'Exo', fontWeight: '800' }}>
                            Registration Form
                        </Typography>
                        {progress ? (
                            <Box style={{ fontFamily: 'Exo' }} className="success-msg" flex="1">Registration Successful! Redirecting...</Box>
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

                            <Box display="flex">
                                <Checkbox name="termsToggle" sx={{
                                    pl: 0, pb: 0, color: '#EF6C00',
                                    '&.Mui-checked': {
                                        color: '#FB8C00',
                                    },
                                }} onClick={handleChange} />
                                <Box color="black" sx={{ cursor: 'pointer', '&:hover': { color: '#EF6C00' } }} onClick={termsLinkClick}>
                                    <Typography sx={{ pt: 1.5 }} variant="subtitle2">I understand and agree to abide by the
                                        <Link href="#" color="inherit" sx={{ ml: 1, fontWeight: '700' }}>
                                            terms and conditions
                                        </Link>
                                    </Typography>
                                </Box>
                            </Box>

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
                {/* <div class="g-recaptcha" data-sitekey="6Lc_Ms0cAAAAAGm000c--3xSi2VvyWGQ9sivnB1F"></div> */}
            </Box>
            <Dialog
                open={termsClick}
                onClose={termsClose}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <nav aria-label="secondary mailbox folders">
                            <List>
                                <ListItem disablePadding>
                                    <Typography variant="subtitle2" color="initial">
                                        <span style={{ marginRight: 10 }}>&#10003;</span>Fees once paid cannot be refunded. If an institute wishes to cancel its
                                        participation, Zista Education can remove the institute’s logo and brand
                                        identifiers from the event collateral.
                                    </Typography>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Typography variant="subtitle2" color="initial">
                                        <span style={{ marginRight: 10 }}>&#10003;</span>An educational institution may choose to have up to two participants on
                                        the day of the event.
                                    </Typography>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Typography variant="subtitle2" color="initial">
                                        <span style={{ marginRight: 10 }}>&#10003;</span>For each extra participant, an extra fee will be applicable.
                                    </Typography>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Typography variant="subtitle2" color="initial">
                                        <span style={{ marginRight: 10 }}>&#10003;</span>Applicant acknowledges and agrees that Zista Education shall not be liable
                                        for any loss, injury delay or damage from any cause beyond its control.
                                    </Typography>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Typography variant="subtitle2" color="initial">
                                        <span style={{ marginRight: 10 }}>&#10003;</span>The individual(s) participating must have knowledge of their institution’s
                                        admissions policies and procedures.
                                    </Typography>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Typography variant="subtitle2" color="initial">
                                        <span style={{ marginRight: 10 }}>&#10003;</span>Zista Education reserves the right to make changes to the event if, in its
                                        judgment, the change will be in the best interest of the participants. This
                                        may include changes to the date, time, technology, platform/software.
                                    </Typography>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Typography variant="subtitle2" color="initial">
                                        <span style={{ marginRight: 10 }}>&#10003;</span>All prices mentioned are based on the current exchange rates and are
                                        subject to change.
                                    </Typography>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Typography variant="subtitle2" color="initial">
                                        <span style={{ marginRight: 10 }}>&#10003;</span>In case the educational institute changes the participant(s) attending the
                                        event, Zista Education needs to be notified in writing, at least 14 days
                                        prior to the event.
                                    </Typography>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Typography variant="subtitle2" color="initial">
                                        <span style={{ marginRight: 10 }}>&#10003;</span>An extra charge of 3.67% is applicable for payments made via credit card.
                                        For any queries, please reach out to us at events@zistaeducation.com.
                                    </Typography>
                                </ListItem>
                            </List>
                        </nav>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ pb: '20px', pr: '24px', pl: '24px' }}>
                    <Button onClick={termsClose} color="primary" variant="contained" autoFocus sx={{
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

            <Snackbar anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} open={snackbar} onClose={handleClose} autoHideDuration={10000}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Please agree to the terms and conditions to continue.
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default RegistrationPage
