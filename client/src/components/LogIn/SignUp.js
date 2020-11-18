import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { isAuthUser } from '../../helper/authUser';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8e24aa'
    }
  }
});

// const DisabledButton = withStyles({
//   root: {
//     "&$disabled": {
//       padding: '10px',
//       marginTop: '20px',
//       backgroundColor: '#cd5441',
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
  loginButton: {
    padding: '10px',
    margin: '20px 0',
    backgroundColor: '#8e24aa',
    '&:hover': {
      backgroundColor: '#9c27b0'
    }
  },
  googleButton: {
    padding: '10px',
    marginTop: '10px',
    marginBottom: '15px',
    backgroundColor: '#cd5441',
    '&:hover': {
      backgroundColor: '#c24633'
    },
  },
  fogotPw: {
    color: '#8e24aa'
  },
  link: {
    color: '#8e24aa',
    textDecoration: 'none'
  },
  warningPassword: {
    marginTop: '10px',
    fontFamily: 'Roboto',
    fontSize: '20px',
    color: '#ce3227'
  }
}));

// const GoogleButtonActive = () => {
//   const classes = useStyles();
//   return (
//     <Button
//       type="submit"
//       fullWidth
//       className={classes.googleButton}
//       variant="contained"
//       color="secondary">
//       Google Login
//     </Button>
//   )
// }

// const GoogleButtonDisabled = () => {
//   return (
//     <DisabledButton
//       type="submit"
//       fullWidth
//       variant="contained"
//       color="secondary"
//       disabled>
//       Google Login
//     </DisabledButton>
//   )
// }
export default function SignUp({ history }) {
  const classes = useStyles();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isCheck1: false,
    isCheck2: false,
  });

  const { email, name, password, confirmPassword, isCheck1, isCheck2 } = form;

  const handleChange = text => e => {
    setForm({ ...form, [text]: e.target.value });
  }

  const onChangeCheckbox1 = (e) => {
    setForm({ ...form, isCheck1: e.target.checked });
  }

  const onChangeCheckbox2 = (e) => {
    setForm({ ...form, isCheck2: e.target.checked });
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (email && name && password && isCheck1 && isCheck2 && confirmPassword) {
      if (password === confirmPassword) {
        axios.post('/api/register', {
          email, name, password: password
        }).then(res => {
          setForm({
            ...form,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            isCheck1: false,
            isCheck2: false,
          });
          toast.success(`Vui lòng kích hoạt tài khoản tại email đã đăng kí`);
        }).catch(err => {
          setForm({
            ...form,
            isCheck1: false,
            isCheck2: false,
          });
          toast.error(`${err.response.data.errors}`)
        });
      } else {
        toast.error('Mật khẩu không trùng khớp !');
      }
    } else {
      if (!email || !password || !name || !confirmPassword) {
        toast.info('Vui lòng điền đầy đủ thông tin !');
      } else {
        if (!isCheck1 || !isCheck2) {
          toast.info('Vui lòng tích chọn Checkbox!');
        }
      }

    }

  }
  return (
    <Container component="main" maxWidth="xl" disableGutters>
      <CssBaseline />
      <ToastContainer />
      {isAuthUser() ? <Redirect to='/dashboard' /> : ''}
      <Typography variant="h4" align="center" className={classes.title}>
        FunRetro
      </Typography>
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Typography variant="h4" align="center" gutterBottom className={classes.login}>
            Register
          </Typography>
          <ThemeProvider theme={theme}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name={name}
              value={name}
              autoComplete="name"
              onChange={handleChange('name')}
              autoFocus />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Your Email"
              name={email}
              value={email}
              onChange={handleChange('email')}
              autoComplete="email" />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name={password}
              value={password}
              label="Password"
              type="password"
              id="password"
              onChange={handleChange('password')}
              autoComplete="current-password" />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name={confirmPassword}
              value={confirmPassword}
              onChange={handleChange('confirmPassword')}
              label="Confirm-Password"
              type="password"
              id="confirm-password" />
          </ThemeProvider>
          <Paper elevation={0} >
            <Typography paragraph variant='caption' className={classes.warningPassword}>
              Mật khẩu phải chứa ít nhất 8 kí tự :1 chữ số, 1 kí tự thường, 1 kí tự hoa và 1 kí tự đặc biệt
          </Typography>
          </Paper>
          <FormGroup>
            <FormControlLabel
              control={< Checkbox checked={isCheck1} value="remember" color="primary" onChange={onChangeCheckbox1} />}
              label="Agree to our Terms and Privacy Policy" />
            <FormControlLabel
              control={< Checkbox checked={isCheck2} value="remember" color="primary" onChange={onChangeCheckbox2} />}
              label="Receive updates, promotions and tips" />
          </FormGroup>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.loginButton}>
            Register
          </Button>
          {/* <GoogleButtonDisabled /> */}
          <Typography align="center" gutterBottom>Or&nbsp;<Link to="/login" className={classes.link}>
            <span className={classes.fogotPw}>
              Login
              </span>
          </Link>
          </Typography>
        </form>
      </div>
    </Container>
  );
}