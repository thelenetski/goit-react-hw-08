import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import { Link } from 'react-router-dom';
import css from './UserMenu.module.css';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={css.wrapper}>
      <p className={(css.username, css.link)}>Welcome, {user.name}</p>
      <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <MdAccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          // anchorOrigin={{
          //   vertical: 'top',
          //   horizontal: 'right',
          // }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/contacts" className={css.link}>
              My contacts
            </Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose;
              dispatch(logOut());
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
