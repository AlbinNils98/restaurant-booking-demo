import { createContext, useContext, useState, type ReactNode } from "react";
import type { MutationAddReservationArgs } from '../generated/graphql';

interface BookingContextType {
  formData: MutationAddReservationArgs;
  setFormData: (data: Partial<MutationAddReservationArgs>) => void;
  resetForm: () => void;
  completedBooking: boolean;
  setCompletedBooking: (completed: boolean) => void;
}

const defaultData: MutationAddReservationArgs = {
  restaurantId: "",
  partySize: 0,
  firstName: "",
  lastName: "",
  email: "",
  message: "",
  sittingStart: ""
};

const BookingContext = createContext<BookingContextType>({
  formData: defaultData,
  setFormData: () => { },
  resetForm: () => { },
  completedBooking: false,
  setCompletedBooking: () => { }
});

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [completedBooking, setCompletedBookingState] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("completedBooking");
      if (saved) return JSON.parse(saved);
    }
    return false;
  });

  const [formData, setFormDataState] = useState<MutationAddReservationArgs>(() => {
    // Load from localStorage if exists
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bookingForm");
      if (saved) return JSON.parse(saved);
    }
    return defaultData;
  });

  const setFormData = (data: Partial<MutationAddReservationArgs>) => {
    setFormDataState((prev) => {
      const updated = { ...prev, ...data };
      if (typeof window !== "undefined") {
        localStorage.setItem("bookingForm", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const setCompletedBooking = (value: boolean) => {
    setCompletedBookingState(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("completedBooking", JSON.stringify(value));
    }
  };

  const resetForm = () => {
    setFormDataState(defaultData);
    localStorage.removeItem("bookingForm");
    localStorage.removeItem("completedBooking")
  };

  return (
    <BookingContext.Provider value={{ formData, setFormData, resetForm, completedBooking, setCompletedBooking }}>
      {children}
    </BookingContext.Provider>
  );
};