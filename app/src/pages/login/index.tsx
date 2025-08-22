import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import type { SignInMutation, SignInMutationVariables } from '../../generated/graphql';
import { useMutation } from '@apollo/client';
import { SIGN_IN_MUTATION } from '../../graphql/mutation/user';
import { useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignInMutationVariables>({
    email: "",
    password: ""
  });
  const [serverError, setServerError] = useState<string | null>(null);


  const [signInMutation] = useMutation<SignInMutation, SignInMutationVariables>(SIGN_IN_MUTATION, {
    onCompleted: (data) => {
      login(data.signIn);
      navigate("/admin");
    },
    onError: (errors) => {
      setServerError(errors.message);
    }
  })

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;
    signInMutation({ variables: formData });
    setFormData({ email: "", password: "" });
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
        Sign in
      </Typography>

      <form onSubmit={handleSubmit}>

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
          label="Password"
          type='password'
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={!!errors.password}
          helperText={errors.password}
        />

        {serverError && (
          <Alert severity="error">
            {serverError}
          </Alert>
        )}

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Send Message
        </Button>
      </form>
    </Box >
  );
}

export default LoginPage;