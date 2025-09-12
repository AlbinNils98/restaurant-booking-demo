import { Box, Button, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';
import Confirmation from './Confirmation';
import { useBooking } from '../../context/Booking';
import PartySizeSelect from './PartySizeSelect';
import SittingPicker from './SittingPicker';
import CustomerDetails from './CustomerDetails';
import RestaurantSelect from './RestaurantSelect';


const steps = ["Choose Restaurant", "Party Size", "Select Sitting", "Reservation Details"];

const BookingFlow = () => {
  const { formData, resetForm, completedBooking } = useBooking();
  const [activeStep, setActiveStep] = useState(() => {
    if (!formData.restaurantId) return 0;
    if (!formData.partySize) return 1;
    if (!formData.sittingStart) return 2;
    if (completedBooking) return 4;
    return 3;
  });


  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
    resetForm();
    setActiveStep(0);
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <RestaurantSelect onClick={handleNext} />;
      case 1:
        return <PartySizeSelect onClick={handleNext} />;
      case 2:
        return <SittingPicker onClick={handleNext} />;
      case 3:
        return <CustomerDetails onClick={handleNext} />;
      case 4:
        return <Confirmation />
      default:
        return null;
    }
  };

  return (
    <Box
      component="form"
      maxWidth={600}
      mx="auto"
      mt={5}
      p={3}
      border="1px solid lightgray"
      borderRadius={2}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Stack maxWidth={500} spacing={2} alignSelf="center" alignItems="center">
        {renderStepContent()}

      </Stack>

      <Box display="flex" justifyContent="space-between" mt={2}>
        {activeStep < 4 && <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>}
        <Button disabled={activeStep === 0} onClick={handleReset} >{activeStep < 4 ? "Restart" : "Make another booking"}</Button>
      </Box>
    </Box>
  );
};

export default BookingFlow;