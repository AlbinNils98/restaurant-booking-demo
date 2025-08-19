// app/src/app.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import BookingPage from "./pages/booking";
import MenuPage from "./pages/menu";
import NotFoundPage from './pages/notFound';
import Header from './components/header';
import { Box } from '@chakra-ui/react';
import ContactPage from './pages/contact';

const App = () => {
  return (
    <Box minHeight={"100vh"} width={"100%"} maxW={"1280px"} bgColor={"gray.700"}>
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
    </Box>
  );
};

export default App;