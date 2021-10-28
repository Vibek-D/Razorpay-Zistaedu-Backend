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
                        <DataComponent />
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
