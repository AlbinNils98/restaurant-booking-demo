import { useMutation } from '@apollo/client';
import { Phone } from '@mui/icons-material';
import { Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import type { SendContactEmailMutation, SendContactEmailMutationVariables } from '../../generated/graphql';
import { SEND_CONTACT_EMAIL_MUTATION } from '../../graphql/mutation/contact';
import { useToast } from '../../context/Toast';

const ContactPage = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState<SendContactEmailMutationVariables>({
    name: "",
    email: "",
    message: "",
  });

  const [serverError, setServerErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const maxNameLength = 32;
  const maxMessageLength = 1000;
  const maxEmailLength = 254;


  const [sendContactEmail, { loading }] = useMutation<SendContactEmailMutation, SendContactEmailMutationVariables>(SEND_CONTACT_EMAIL_MUTATION, {
    onCompleted: () => {
      setServerErrorMessage(null);
      showToast('Message sent!', 'success');
      setFormData({
        name: '',
        email: '',
        message: ''
      })
    },
    onError: (error) => setServerErrorMessage(error.message)
  });


  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.name.length > maxNameLength) newErrors.name = 'Name cannot contain more than 32 characters'
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.message.length > maxMessageLength) newErrors.message = "Message cannot contain more than 1000 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    sendContactEmail({ variables: formData });
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

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Stack>
          <TextField
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            slotProps={{ htmlInput: { maxLength: maxNameLength } }}
            error={!!errors.name}
            helperText={errors.name}
          />
          <CharacterCounter currentLength={formData.name.length} maxLength={maxNameLength} />
        </Stack>

        <Stack>
          <TextField
            label="Email"
            fullWidth
            helperText={errors.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            slotProps={{ htmlInput: { maxLength: maxEmailLength } }}
            value={formData.email}
            error={!!errors.email}
          />
          <CharacterCounter currentLength={formData.email.length} maxLength={maxEmailLength} />

        </Stack>
        <Stack>
          <TextField
            label="Message"
            multiline
            minRows={4}
            fullWidth
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            slotProps={{ htmlInput: { maxLength: maxMessageLength } }}
            error={!!errors.message}
            helperText={errors.message}
          />
          <CharacterCounter currentLength={formData.message.length} maxLength={maxMessageLength} />

        </Stack>

        {loading ? <CircularProgress sx={{ alignSelf: 'center' }} /> : <Button type="submit" variant="contained" color="primary" fullWidth>
          Send Message
        </Button>}
        {serverError && <Typography color='error' alignSelf='center' border='solid 2px' borderRadius={1} p={1}>{serverError}</Typography>}

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

const CharacterCounter = ({ currentLength, maxLength }: { currentLength: number, maxLength: number }) => {
  return (
    <Typography
      variant="caption"
      color={currentLength === maxLength ? 'error' : 'textSecondary'}
      sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}
    >
      {currentLength}/{maxLength}
    </Typography>
  );
}

export default ContactPage;