import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAccount } from "../../lib/hooks/useAccount";
import { useForm } from "react-hook-form";
import TextInput from "../../app/shared/components/TextInput";
import { Link } from "react-router";
import { registerSchema, type RegisterSchema } from "../../lib/schemas/registerSchema";

export default function RegisterForm() {
  const { registerUser } = useAccount();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser.mutateAsync(data, {
        onError: (error) => {
            if (Array.isArray(error)) {
                error.forEach(err => {
                    if (err.includes('Email')) setError('email', {message: err});
                    else if(err.includes('Password')) setError('password', {message: err});
                })
            }
        }
    });
  };

  return (
    <Paper 
    component="form"
    onSubmit={handleSubmit(onSubmit)}
    sx={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: 3,
            p:3,
            maxWidth: 'md',
            mx: 'auto',
            borderRadius: 3, 
        }}>
      <Box
        sx={{ 
            display: "flex",
            alignItems: "center",
            justifyContent: "center", 
            gap: 3,
            color: "primary.main",
        
        }}
        >
        <LockOpenIcon fontSize="large" />
        <Typography variant="h4">Register</Typography>
      </Box>
      <TextInput name="email" control={control} label="Email" />
      <TextInput name="displayName" control={control} label="Display name" />
      <TextInput name="password" control={control} label="Password" type="password" />
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={!isValid || isSubmitting}
      >
        Register
      </Button>
      <Typography sx={{textAlign: 'center'}} >
        Already have an account?
        <Typography sx={{ml:2}} component={Link} to={'/login'} color="primary">
          Sign in
        </Typography>
      </Typography>
    </Paper>
  );
}