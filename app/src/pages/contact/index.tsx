import { Phone } from '@mui/icons-material';
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Form submitted", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Box
      maxWidth={600}
      mx="auto"
      mt={5}
      p={4}
      border="1px solid lightgray"
      borderRadius={2}
      boxShadow={2}
    >
      <Typography variant="h4" mb={3} textAlign="center">
        Contact
      </Typography>

      {submitted && <Alert severity="success" sx={{ mb: 2 }}>Your message has been sent!</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Message"
          multiline
          minRows={4}
          fullWidth
          margin="normal"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          error={!!errors.message}
          helperText={errors.message}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Send Message
        </Button>
      </form>

      <Stack direction="row" alignItems="center" spacing={1.5} mt={3}>
        <Phone color="primary" fontSize="medium" />
        <Typography
          variant="body1"
          component="a"
          href="tel:+46700000000"
          sx={{
            textDecoration: 'none',
            color: 'text.primary',
            fontWeight: 500,
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          070 000 00 00
        </Typography>
      </Stack>
    </Box >
  );
};

export default ContactPage;