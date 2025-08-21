import { CheckCircleOutline } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';


const Confirmation = () => {

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      mt={3}
    >
      <CheckCircleOutline color="success" sx={{ fontSize: 60 }} />
      <Typography variant="h5" fontWeight="bold">
        Booking confirmed!
      </Typography>
      <Typography color="text.secondary" textAlign="center">
        Please check your email inbox for the confirmation email.
      </Typography>
    </Box>
  )
}


export default Confirmation;