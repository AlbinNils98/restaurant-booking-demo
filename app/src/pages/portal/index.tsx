import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from '../../context/Auth';


const MainPortalPage = () => {
  const { user } = useAuth();
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
        Welcome {user?.name},
      </Typography>
      <Typography variant="h6" gutterBottom>
        What do you need to do today?
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} mt={4}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="menus"
        >
          Make changes to menus?
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="reservations"
        >
          Handle reservations?
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="restaurants"
        >
          Make changes to restaurants?
        </Button>
      </Stack>
    </Box>
  );
}

export default MainPortalPage;