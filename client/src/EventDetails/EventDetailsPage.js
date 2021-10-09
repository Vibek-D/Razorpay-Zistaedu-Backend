import React from 'react';
import Box from '@material-ui/core/Box';
import AuthRegister from "../AuthRegister";
import DataComponent from "./DataComponent";
import EventSelection from "./EventSelection";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function EventDetailsPage() {
    const history = useHistory();
    React.useEffect(() => {
        if (!AuthRegister.registerUserData) {
            history.push('/');
        }
    }, [history]);
    return (
        <Box flex="1">
            <Box>
                <Typography variant="h3" color="initial" sx={{ fontFamily: 'Exo', fontWeight: '500', ml: '25px', mt: '15px' }}>
                    Welcome {AuthRegister.registerUserData.data.fName}  {AuthRegister.registerUserData.data.lName}
                </Typography>
            </Box>
            <Box display='flex' justifyContent='center' flexDirection='column' m={4}>
                <Typography variant='h5' mb={3} sx={{ fontFamily: 'Exo', fontWeight: '800' }}>PARTICIPATION FEE DETAILS</Typography>
                <DataComponent />
            </Box>
            <Box display='flex' justifyContent='center' flexDirection='column' m={4}>
                <Typography variant='h5' mb={3} sx={{ fontFamily: 'Exo', fontWeight: '800' }}>EVENTS SELECTION DETAILS</Typography>
                <EventSelection />
            </Box>
        </Box>
    )
}

export default EventDetailsPage
