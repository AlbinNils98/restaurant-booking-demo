import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/home";
import BookingPage from "./pages/booking";
import MenuPage from "./pages/menu";
import NotFoundPage from './pages/notFound';
import Header from './components/header';
import ContactPage from './pages/contact';
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import LoginPage from './pages/login';
import { AuthProvider } from './context/Auth';
import { ProtectedRoute } from './components/ProtectedRoute';
import MenuPortalPage from './pages/portal/menu';
import MainPortalPage from './pages/portal';
import PortalHeader from './components/portal/header';
import RestaurantPortalPage from './pages/portal/restaurant';
import ReservationPortalPage from './pages/portal/reservation';
import { ToastProvider } from './context/Toast';

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

const PortalLayout = () => {
  return (
    <>
      <PortalHeader />
      <Outlet />
    </>
  );
};

const App = () => {

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <Box
      minHeight="100vh"
      width="100%"
      maxWidth="1280px"
      bgcolor="grey.900"
      px={3}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route element={<DefaultLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path='/login' element={<LoginPage />} />
                </Route>
                <Route path='/admin' element={<ProtectedRoute />} >
                  <Route element={<PortalLayout />}>
                    <Route index element={<MainPortalPage />} />
                    <Route path='/admin/menus' element={<MenuPortalPage />} />
                    <Route path='/admin/restaurants' element={<RestaurantPortalPage />} />
                    <Route path='/admin/reservations' element={<ReservationPortalPage />} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Box>
  );
};

export default App;