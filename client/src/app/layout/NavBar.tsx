import { Group } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  MenuList,
} from "@mui/material";

type Props = {
  openForm: () => void;
};

export default function NavBar({ openForm }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <MenuList sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Group fontSize="large" />
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ fontWeight: "bold" }}
                >
                  Reactivities
                </Typography>
              </MenuList>
            </Box>
            <Box>
              <MenuList sx={{ display: "flex", gap: 4, alignItems: "center" }}>
                <Button
                  color="inherit"
                  sx={{
                    fontSize: "1.2rem",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  Activities
                </Button>
                <Button
                  color="inherit"
                  sx={{
                    fontSize: "1.2rem",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  About
                </Button>
                <Button
                  color="inherit"
                  sx={{
                    fontSize: "1.2rem",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  Contact
                </Button>
              </MenuList>
            </Box>

            <Button
              size="large"
              variant="contained"
              color="warning"
              onClick={() => openForm()}
            >
              Create Activity
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
