import { BookingProvider } from '../../context/Booking';
import BookingFLow from '../../components/bookingFlow/BookingFlow';

export default function BookingPage() {


  return (
    <BookingProvider>
      <BookingFLow />
    </BookingProvider>
  );
}