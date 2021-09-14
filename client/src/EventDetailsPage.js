import React from 'react';
import Box from '@material-ui/core/Box';
import DataComponent from "./DataComponent";
import EventSelection from "./EventSelection";
import { Typography } from "@material-ui/core";

function EventDetailsPage() {
    return (
        <Box flex="1">
            <Box display='flex' justifyContent='center' flexDirection='column' m={4}>
                <Typography variant='h5' mb={3} sx={{ fontFamily: 'Montserrat' }}>PARTICIPATION FEE DETAILS:</Typography>
                <DataComponent />
            </Box>
            <Box display='flex' justifyContent='center' flexDirection='column' m={4}>
                <Typography variant='h5' mb={3} sx={{ fontFamily: 'Montserrat' }}>EVENTS SELECTION DETAILS:</Typography>
                <EventSelection />
            </Box>
        </Box>
    )
}

export default EventDetailsPage
