import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Avatar, Divider, ListItemIcon, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAccount } from '../../lib/hooks/useAccount';
import { Link } from 'react-router';
import { Person } from '@mui/icons-material';

export default function UserMenu() {
  const {currentUser, logoutUser} = useAccount();
  const id = React.useId();
  const buttonId = `${id}-button`;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{ color: 'inherit', fontSize: '1.1rem', size: 'large' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar />
            {currentUser?.displayName}
        </Box>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': buttonId,
          },
        }}
      >
        <MenuItem component={Link} to="/createActivity" onClick={handleClose}>
            <ListItemIcon>
                <AddIcon />
            </ListItemIcon>
            <ListItemText>Create Activity</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/profile" onClick={handleClose}>
            <ListItemIcon>
                <Person />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {
            logoutUser.mutate();
            handleClose();
        }}>
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
