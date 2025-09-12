import { Box, Stack, Divider, Typography, Link as MuiLink, Button, useTheme } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuth } from '../../../context/Auth';
import ThemeToggleButton from '../../ThemeToggleButton';

const UnderlineLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const theme = useTheme();

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
          bgcolor: theme.palette.text.primary,
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
    <Box py={3} width="100%">
      <Stack direction="row" alignItems="center" spacing={2}>
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
          variant="contained"
          size="small"
          onClick={logout}
          sx={{
            ml: 3,
          }}
        >
          Logout
        </Button>
        <ThemeToggleButton />
      </Stack>
      <Divider sx={{ mt: 2, bgcolor: "grey.600" }} />
    </Box>
  );
}



export default PortalHeader;