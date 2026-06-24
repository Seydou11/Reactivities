import { Container, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Reactivities
        </Typography>
    </Container>
  )
}