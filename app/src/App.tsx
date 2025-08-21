import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import BookingPage from "./pages/booking";
import MenuPage from "./pages/menu";
import NotFoundPage from './pages/notFound';
import Header from './components/header';
import ContactPage from './pages/contact';
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';

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
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Box>
  );
};

export default App;