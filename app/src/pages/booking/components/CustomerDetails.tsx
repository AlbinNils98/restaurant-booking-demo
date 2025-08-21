import { Button, TextareaAutosize, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_RESERVATION_MUTATION } from '../../../graphql/mutation/reservation';
import type { AddReservationMutation, AddReservationMutationVariables } from '../../../generated/graphql';
import { useState } from 'react';
import { useBooking } from '../../../context/Booking';


type ReservationFormProps = {
  onClick: () => void;
}

const CustomerDetails = ({ onClick }: ReservationFormProps) => {
  const { formData, setFormData, setCompletedBooking } = useBooking();
  const [errors, setErrors] = useState<Record<string, string>>({});


  const [makeReservation, { loading }] = useMutation<AddReservationMutation, AddReservationMutationVariables>(ADD_RESERVATION_MUTATION, {
    onCompleted: () => {
      onClick();
      setCompletedBooking(true);
    }
  });

  const capitalizeWords = (text: string) =>
    text.replace(/\b\w/g, (c) => c.toUpperCase());

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    return newErrors;
  };


  const handleSubmit = async () => {
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 &&
      formData.sittingStart &&
      formData.partySize &&
      formData.restaurantId
    ) {
      await makeReservation({ variables: formData });
    }
  };

  return (
    <>
      <TextField
        label="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ firstName: capitalizeWords(e.target.value) })}
        required
        fullWidth
        error={!!errors.firstName}
        helperText={errors.firstName}
      />

      <TextField
        label="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ lastName: capitalizeWords(e.target.value) })}
        required
        fullWidth
        error={!!errors.lastName}
        helperText={errors.lastName}
      />

      <TextField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ email: e.target.value })}
        required
        fullWidth
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextareaAutosize
        minRows={3}
        value={formData.message || ""}
        placeholder="Message to the restaurant"
        style={{ width: "100%", padding: 8, resize: "none" }}
        onChange={(e) => setFormData({ message: e.target.value })}
      />

      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth>
        Make Reservation
      </Button>
    </>
  )
};

export default CustomerDetails;