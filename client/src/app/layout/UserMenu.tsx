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
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const id = React.useId();
  const buttonId = `${id}-button`;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // MUI hides the application root while the menu is mounted. Removing the
    // focus first prevents Chrome from finding a focused element inside the
    // root at the exact moment aria-hidden is applied.
    event.currentTarget.blur();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // During its exit transition, MUI sets aria-hidden on the menu. Make sure
    // no menu item keeps focus while that happens, then restore focus to the
    // trigger after React has started unmounting the menu.
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setAnchorEl(null);
    requestAnimationFrame(() => buttonRef.current?.focus());
  };

  return (
    <>
      <Button
        ref={buttonRef}
        id={buttonId}
        onClick={handleClick}
        sx={{ color: 'inherit', fontSize: '1.1rem', size: 'large' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            src={currentUser?.imageUrl}
            alt='current user image'
          />
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
        <MenuItem component={Link} to={`/profiles/${currentUser?.id}`} onClick={handleClose}>
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
