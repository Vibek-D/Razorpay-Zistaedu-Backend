import React from 'react';
import Box from '@material-ui/core/Box';
import AuthRegister from "../AuthRegister";
import Radio from '@material-ui/core/Radio';
import DataComponent from "./DataComponent";
import { useHistory } from "react-router-dom";
import EventSelection from "./EventSelection";
import { Typography } from "@material-ui/core";
import { rowsWire, rowsCredit } from './constant';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import EventSelectionCredit from "./EventSelectionCredit";
import FormControlLabel from '@material-ui/core/FormControlLabel';

function EventDetailsPage() {
    const history = useHistory();
    const [paymentMethod, setPaymentMethod] = React.useState('wire');

    React.useEffect(() => {
        if (!AuthRegister.registerUserData) {
            history.push('/');
        }
    }, [history]);

    React.useEffect(() => {
        console.log(paymentMethod);
    }, [paymentMethod]);

    const handleRadioChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    return (
        <>
            {AuthRegister.registerUserData && (
                <Box flex="1" sx={{ backgroundColor: 'whitesmoke' }}>
                    <Box>
                        <Typography variant="h3" color="initial" sx={{ fontFamily: 'Exo', fontWeight: '500', ml: '25px', pt: '15px' }}>
                            Welcome {AuthRegister.registerUserData.data.fName}  {AuthRegister.registerUserData.data.lName}
                        </Typography>
                    </Box>
                    <Box display='flex' justifyContent='center' flexDirection='column' ml={4} mr={4} mt={2}>
                        <Typography variant='h5' mb={3} sx={{ fontFamily: 'Exo', fontWeight: '800' }}>PARTICIPATION FEE DETAILS</Typography>
                        <Box>
                            <Typography variant="body1" fontSize="1.2rem" sx={{ fontFamily: 'Exo', fontWeight: '900' }} color="initial">Virtual Events</Typography>
                            <div>Main Expo: USD 1,500</div>
                            <div>Breakout Session: USD 500</div>
                            <div>Post Event Lead Nurturing Webinar: USD 350</div>

                            <Typography variant="body1" fontSize="1.2rem" sx={{ fontFamily: 'Exo', fontWeight: '900', mt: 2 }} color="initial">In-Person Events</Typography>
                            <div>Main Expo: USD 1,700</div>
                            <div>Breakout Session: USD 500</div>
                            <div>Post Event Lead Nurturing Webinar: USD 350</div>
                        </Box>
                        <Box display="flex" mt={3} flexDirection="column">
                            <Typography variant="body1" fontSize="1.2rem" sx={{ fontFamily: 'Exo', fontWeight: '900' }} color="initial">Note: Applicable to Virtual Events & In-Person Events</Typography>
                            <div style={{ paddingTop: '3px' }}>
                                <div>If you participate in more than one event you get a discount of USD 100 on each additional event.</div>
                                <div>First time registrants get a USD 100 discount.</div>
                                <div>An extra charge of 3.67% is applicable on payments via credit card.</div>
                            </div>
                        </Box>
                        {/* <DataComponent /> */}
                    </Box>
                    <Box display='flex' justifyContent='center' flexDirection='column' ml={4} mr={4} mt={4}>
                        <Typography variant='h5' mb={3} sx={{ fontFamily: 'Exo', fontWeight: '800' }}>CHOOSE A PAYMENT METHOD</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup row defaultValue="wire" name="radio-buttons-group" value={paymentMethod} onChange={handleRadioChange}>
                                <FormControlLabel value="wire" control={<Radio sx={{
                                    color: '#EF6C00',
                                    '&.Mui-checked': {
                                        color: '#FB8C00',
                                    },
                                }} />} label="Pay Via Wire Transfer" />
                                <FormControlLabel value="credit" control={<Radio sx={{
                                    color: '#EF6C00',
                                    '&.Mui-checked': {
                                        color: '#FB8C00',
                                    },
                                }} />} label="Pay Via Credit Card" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    {paymentMethod === 'wire' ? (
                        <Box display='flex' justifyContent='center' flexDirection='column' ml={4} mr={4} mt={4}>
                            <Typography variant='h5' mb={3} sx={{ fontFamily: 'Exo', fontWeight: '800' }}>EVENT SELECTION</Typography>
                            <EventSelection registerUserData={AuthRegister.registerUserData} paymentMethod={paymentMethod} data={rowsWire} />
                        </Box>
                    ) : (
                        <Box display='flex' justifyContent='center' flexDirection='column' ml={4} mr={4} mt={4}>
                            <Typography variant='h5' mb={3} sx={{ fontFamily: 'Exo', fontWeight: '800' }}>EVENT SELECTION</Typography>
                            <EventSelectionCredit registerUserData={AuthRegister.registerUserData} paymentMethod={paymentMethod} data={rowsCredit} />
                        </Box>
                    )}

                </Box>
            )}
        </>
    )
}

export default EventDetailsPage
