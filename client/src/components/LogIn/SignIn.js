import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReCAPTCHA from 'react-grecaptcha';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link, Redirect } from "react-router-dom";
import { isAuthUser, authenticate } from '../../helper/authUser';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8e24aa'
    }
  }
});

const LoginButtonActive = ({ history }) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      fullWidth
      className={classes.loginButton}
      variant="contained"
      color="secondary">
      Log In
    </Button>
  )
}

// const LoginButtonDisabled = () => {
//   return (
//     <DisabledButton
//       type="submit"
//       fullWidth
//       variant="contained"
//       color="secondary"
//       disabled>
//       Log In
//     </DisabledButton>
//   )
// }

// const DisabledButton = withStyles({
//   root: {
//     "&$disabled": {
//       padding: '10px',
//       marginTop: '20px',
//       backgroundColor: '#8e24aa',
//       cursor: 'not-allowed',
//       color: 'rgba(255, 255, 255,1)',
//       opacity: '0.65'
//     }
//   },
//   disabled: {}
// })(Button);

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: 'url(https://funretro.io/img/crossword.png)'
  },
  title: {
    margin: '1em 0',
    fontFamily: 'ThirstyScript',
    color: '#8e24aa',
    fontSize: '2.5em'
  },
  login: {
    marginTop: '0.35em',
    color: '#555'
  },
  form: {
    width: '500px',
    margin: 'auto',
    padding: '2em',
    backgroundColor: '#ffffff',
    marginBottom: '40px',
    borderRadius: '0.125rem',
    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)'
  },
  fogotPw: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: '#8e24aa',
  },
  reCaptcha: {
    display: 'flex',
    justifyContent: 'center'
  },
  loginButton: {
    padding: '10px',
    marginTop: '20px',
    backgroundColor: '#8e24aa',
    '&:hover': {
      backgroundColor: '#9c27b0'
    }
  },
  googleButton: {
    padding: '10px',
    marginTop: '10px',
    backgroundColor: '#cd5441',
    '&:hover': {
      backgroundColor: '#c24633'
    }
  },
  facebookButton: {
    padding: '10px',
    marginTop: '10px',
    marginBottom: '15px',
    backgroundColor: '#4267b2',
    '&:hover': {
      backgroundColor: '#1664A2'
    }
  }, link: {
    color: '#8e24aa',
    textDecoration: 'none'
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

export default function SignIn({ history }) {
  const classes = useStyles();
  const [form, setForm] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [isVerified, setIsVerified] = useState(false);
  const { email, password, showPassword } = form;

  const handleChange = text => e => {
    setForm({ ...form, [text]: e.target.value });
  }

  const requestGoogleToken = tokenId => {
    axios.post('/api/googlelogin', {
      idToken: tokenId
    }).then(res => {
      authenticate(res, () => {
        if (isAuthUser()) {
          history.push('/dashboard');
        };
        toast.success('Đăng nhập Google thành công')
      })
    }).catch(error => {
      toast.error('Đăng nhập Google không thành công')
    });
  }

  const responseGoogleToken = response => {
    requestGoogleToken(response.tokenId);
  }

  const requestFacebookToken = (userID, accessToken) => {
    axios.post('/api/facebooklogin', {
      userID,
      accessToken
    }).then(res => {
      authenticate(res, () => {
        if (isAuthUser()) {
          history.push('/dashboard');
        }
        toast.success('Đăng nhập Facebook thành công')
      })
    }).catch(error => {
      if (error) {
        toast.error('Đăng nhập Facebook không thành công')
      }
    });
  }

  const responseFacebookToken = response => {
    requestFacebookToken(response.userID, response.accessToken);
  }

  const handleClickShowPassword = () => {
    setForm({ ...form, showPassword: !showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const verifyRecaptcha = (response) => {
    if (response) {
      setIsVerified(true);
    }
  }

  const expiredCallback = () => {
    toast.info('ReCAPTCHA hết hạn !')
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (!isVerified) {
      toast.error('Vui lòng tích chọn reCAPTCHA !');
    } else {
      if (email && password) {
        axios.post('/api/login', {
          email, password: password
        }).then(res => {
          authenticate(res, () => {
            setForm({
              ...form,
              email: '',
              password: '',
            });
            if (isAuthUser()) {
              history.push('/dashboard');
            };
            toast.success('Đăng nhập thành công');
          });
        }).catch(err => {
          toast.error(err.response.data.errors);
          window.grecaptcha.reset();
        });
      } else {
        toast.warning('Vui lòng điền đầy đủ thông tin !');
        window.grecaptcha.reset();
      }
    }

  }
  return (
    <Container component="main" maxWidth="xl" disableGutters>
      <CssBaseline />
      <ToastContainer />
      {isAuthUser() ? <Redirect to={'/dashboard'} /> : null}
      <Typography variant="h4" align="center" className={classes.title}>
        FunRetro
      </Typography>
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Typography variant="h4" align="center" gutterBottom className={classes.login}>
            Login
          </Typography>
          <ThemeProvider theme={theme}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={email}
              id="email"
              type="email"
              label="Your Email"
              name={email}
              onChange={handleChange('email')}
              autoFocus />
            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="password">Password *</InputLabel>
              <OutlinedInput
                required
                fullWidth
                value={password}
                name={password}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                id="password"
                onChange={handleChange('password')} />
            </FormControl>
          </ThemeProvider>
          <Link className={classes.link} to="/user/password/forgot">
            <Typography align="right" gutterBottom className={classes.fogotPw}>Forgot password?</Typography>
          </Link>
          <ReCAPTCHA
            // sitekey="6LdsIt0ZAAAAAON86rNDsrsoDGTvoTIB0l1-pt1q"
            sitekey={`${process.env.REACT_APP_SITE_KEY}`}
            callback={verifyRecaptcha}
            expiredCallback={expiredCallback}
            className={classes.reCaptcha}>
          </ReCAPTCHA>
          <LoginButtonActive />
          <GoogleLogin
            // clientId='259539250532-iuij50t02fh3ufmggf26kfqc3rbh6oi5.apps.googleusercontent.com'
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
            onSuccess={responseGoogleToken}
            onFailure={responseGoogleToken}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <Button
                onClick={renderProps.onClick}
                // disabled={renderProps.disabled}
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.googleButton}>
                Google Login
              </Button>
            )}
          >
          </GoogleLogin>
          <FacebookLogin
            appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
            // appId='1088341511620335'
            autoLoad={false}
            callback={responseFacebookToken}
            render={renderProps => (
              <Button
                onClick={renderProps.onClick}
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.facebookButton}>
                FaceBook Login
              </Button>
            )}>
          </FacebookLogin>

          <Typography align="center" gutterBottom>Or&nbsp;
            <Link to="/register" className={classes.link} style={{
              display: 'block',
              width: '100%',
            }}><span className={classes.fogotPw}>Register</span></Link>
          </Typography>
        </form>
      </div>
    </Container>
  );
}