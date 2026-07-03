import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAccount } from "../../lib/hooks/useAccount";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { useForm } from "react-hook-form";
import TextInput from "../../app/shared/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";

export default function LoginForm() {
  const { loginUser } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data, {
      onSuccess: () => {
        navigate(location.state?.form || '/activities');
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
        <Typography variant="h4">Sign In</Typography>
      </Box>
      <TextInput name="email" control={control} label="Email" />
      <TextInput name="password" control={control} label="Password" type="password" />
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={!isValid || isSubmitting}
      >
        Login
      </Button>
      <Typography sx={{textAlign: 'center'}} >
        Don't have an account?
        <Typography sx={{ml:2}} component={Link} to={'/register'} color="primary">
          Sign up
        </Typography>
      </Typography>
    </Paper>
  );
}
