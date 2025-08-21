import { BookingProvider } from '../../context/Booking';
import BookingFLow from './components/BookingFlow';

export default function BookingPage() {


  return (
    <BookingProvider>
      <BookingFLow />
    </BookingProvider>
  );
}