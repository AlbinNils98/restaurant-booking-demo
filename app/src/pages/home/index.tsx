import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";



const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      textAlign="center"
      px={3}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to,
      </Typography>
      <Typography variant="h3" gutterBottom>
        Restaurant-Booking-Demo
      </Typography>
      <Typography variant="h6" gutterBottom>
        Explore our menus, book a table, or contact us
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} mt={4}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/menus"
        >
          Menus
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/booking"
        >
          Book a Table
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/contact"
        >
          Contact
        </Button>
      </Stack>
    </Box>
  );
}

export default HomePage;