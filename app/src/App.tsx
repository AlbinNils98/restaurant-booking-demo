import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/home";
import BookingPage from "./pages/booking";
import MenuPage from "./pages/menu";
import NotFoundPage from './pages/notFound';
import Header from './components/header';
import ContactPage from './pages/contact';
import { Box } from '@mui/material';
import LoginPage from './pages/login';
import { AuthProvider } from './context/Auth';
import { ProtectedRoute } from './components/ProtectedRoute';
import MenuPortalPage from './pages/portal/menu';
import MainPortalPage from './pages/portal';
import PortalHeader from './components/portal/header';
import RestaurantPortalPage from './pages/portal/restaurant';
import ReservationPortalPage from './pages/portal/reservation';
import { ToastProvider } from './context/Toast';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';


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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wakeApi().then(() => setLoading(false));
  }, []);

  if (loading) return <div>Waking up render server, please wait...</div>

  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        minHeight="100vh"
        width="100%"
        maxWidth="1280px"
        px={3}
      >
        <BrowserRouter>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route element={<DefaultLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/menus" element={<MenuPage />} />
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
      </Box>
    </LocalizationProvider>
  );
};

const wakeApi = async () => {
  let ready = false;
  let API_URL = import.meta.env.VITE_API_URL
  while (!ready) {
    try {
      const res = await fetch(API_URL ? API_URL : 'http://localhost:5000/', {
        method: 'GET',
      });

      if (res.ok) {
        ready = true;
      }

    } catch (err) {
      // Ignore and retry
    }

    if (!ready) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

export default App;