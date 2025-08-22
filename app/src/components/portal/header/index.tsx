import { Box, Stack, Divider, Typography, Link as MuiLink, Button } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuth } from '../../../context/Auth';

const UnderlineLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <MuiLink
      component={RouterLink}
      to={to}
      underline="none"
      sx={{
        position: "relative",
        color: "inherit",
        fontWeight: 500,
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          bottom: -2,
          height: 2,
          width: isActive ? "100%" : "0%",
          bgcolor: "white",
          transition: "width 0.3s ease",
        },
        "&:hover::after": {
          width: "100%",
        },
      }}
    >
      {children}
    </MuiLink>
  );
};

function HeaderLinks() {
  return (
    <Stack direction="row" spacing={4} alignItems="center">
      <UnderlineLink to="/admin/menus">Menu</UnderlineLink>
      <UnderlineLink to="/admin/restaurants">Restaurants</UnderlineLink>
      <UnderlineLink to="/admin/reservations">Reservations</UnderlineLink>
    </Stack>
  );
}

export function PortalHeader() {
  const { logout } = useAuth();
  return (
    <Box bgcolor="grey.900" py={3} color="white" width="100%">
      <Stack direction="row" alignItems="center">
        <MuiLink
          component={RouterLink}
          to="/"
          underline="none"
          color="inherit"
          pl={1}
        >
          <Typography variant="h6">RestaurantDemo</Typography>
        </MuiLink>

        <Box flexGrow={1} />

        <HeaderLinks />

        <Button
          variant="outlined"
          size="small"
          onClick={logout}
          sx={{
            ml: 3,
            borderColor: "white",
            color: "white",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
              borderColor: "white",
            },
          }}
        >
          Logout
        </Button>
      </Stack>
      <Divider sx={{ mt: 2, bgcolor: "grey.600" }} />
    </Box>
  );
}



export default PortalHeader;