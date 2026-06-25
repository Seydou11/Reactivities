import { Group } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  MenuList,
  LinearProgress,
} from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/menuItemLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";

export default function NavBar() {
  const {uiStore} = useStore();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)",
            position:'relative'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <MenuList component={NavLink} to="/" 
                sx={{ display: "flex", gap: 2, alignItems: "center", color: "inherit" }}>
                <Group fontSize="large" />
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ fontWeight: "bold", }}
                >
                  Reactivities
                </Typography>
              </MenuList>
            </Box>
            <Box sx={{display: 'flex', gap:2}}>
              <MenuItemLink to="/activities" >
                  Activities
              </MenuItemLink>
              <MenuItemLink to="/createActivity" >
                Create Activity
              </MenuItemLink>
              <MenuItemLink to="/counter" >
                Counter
              </MenuItemLink>
            </Box>
            <MenuList>
              User menu
            </MenuList>
          </Toolbar>
        </Container>
        <Observer>
          {() => uiStore.isLoading ? (
            <LinearProgress 
              color="secondary"
              sx={{
                position:'absolute',
                bottom:0,
                left:0,
                right:0,
                height:4
              }}
            
            />
          ): null}
        </Observer>
      </AppBar>
    </Box>
  );
}
