import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout, isAuthUser } from '../../helper/authUser';
import { withRouter } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  title: {
    marginRight: '10px',
    display: 'none',
    cursor: 'pointer',
    fontFamily: 'ThirstyScript',
    [
      theme
        .breakpoints
        .up('sm')
    ]: {
      display: 'block'
    }
  },
  sectionDesktop: {
    display: 'none',
    [
      theme
        .breakpoints
        .up('md')
    ]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [
      theme
        .breakpoints
        .up('md')
    ]: {
      display: 'none'
    }
  }
}));

const NarBar = ({ children, history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const [form, setForm] = useState({
    errorMessage: '',
    typeErrorMessage: '',
    open: false,
  });
  const { errorMessage, typeErrorMessage, open } = form;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleClose = () => {
    setForm({ ...form, open: false });
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={() => {
        handleMenuClose();
        history.push("/user/profile");
      }} >
        <IconButton
          edge='start'
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <AccountCircle />
        </IconButton>
        My Profile
      </MenuItem>
      <MenuItem onClick={() => {
        handleMenuClose();
        logout(() => {
          history.push('/');
        })
      }}>
        <IconButton
          edge='start'
          aria-label="log out current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <ExitToAppIcon />
        </IconButton>
        Log Out
        </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem onClick={() => {
        handleMenuClose();
        history.push("/user/profile");
      }}>
        <IconButton
          edge='start'
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <AccountCircle />
        </IconButton>
        <p>My Profile</p>
      </MenuItem>
      <MenuItem onClick={() => {
        handleMenuClose();
        logout(() => {
          history.push('/');
        })
      }}>
        <IconButton
          edge='start'
          aria-label="log out current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <p>Log Out</p>
      </MenuItem>
    </Menu>
  );

  const Narbar = (
    <div className={classes.grow}>
      <Snackbar open={open} autoHideDuration={4000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeErrorMessage} variant="filled">
          <AlertTitle>{typeErrorMessage.charAt(0).toUpperCase() + typeErrorMessage.slice(1)}</AlertTitle>
          {errorMessage}
        </Alert>
      </Snackbar>
      <AppBar position="sticky" style={{ backgroundColor: '#2196f3' }}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap onClick={() => {
            history.push('/dashboard')
          }}>
            FunRetro
          </Typography>
          <div className={classes.grow} />
          {isAuthUser() && (
            <>
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit">
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit">
                  <MoreIcon />
                </IconButton>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )

  return (
    <>
      {Narbar}
      {children}
    </>
  );
}

export default withRouter(NarBar);