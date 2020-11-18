import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import { updateUser, isAuthUser, getCookie, logout } from '../../helper/authUser';
import NarBar from '../Header/NarBar';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#8e24aa'
        }
    }
});

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
        marginTop: '20px',
        backgroundColor: '#8e24aa',
        '&:hover': {
            backgroundColor: '#9c27b0'
        }
    },
    signupButton: {
        padding: '10px',
        marginTop: '20px',
        backgroundColor: '#048DFF',
        '&:hover': {
            backgroundColor: '#3CB3FF'
        }
    },
    link: {
        display: 'block',
        width: '100%',
        color: '#8e24aa',
        textDecoration: 'none'
    }
}));


export default function Profile({ history }) {
    const classes = useStyles();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    useEffect(() => {
        const token = getCookie('token');
        axios.get(`/api/user/${isAuthUser()._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            const { name, email } = res.data;
            setForm({ ...form, name, email });
        }).catch(err => {
            toast.error(`Lỗi ${err.response.data.error}`);
            if (err.response.status === 401) {
                logout(() => {
                    history.push('/login');
                });
            }
        });
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const { name, email, password } = form;

    const handleChange = text => e => {
        setForm({ ...form, [text]: e.target.value });
    };

    const handleSubmit = e => {
        const token = getCookie('token');
        e.preventDefault();
        axios.put('/api/user/update', {
            name,
            email,
            password: password
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            updateUser(res, () => {
                toast.success('Cập nhật thông tin thành công');
            });
        }).catch(err => {
            toast.error(`${err.response.data.error}`);
        });
    };

    return (
        <NarBar>
            <Container component="main" maxWidth="xl" disableGutters>
                <CssBaseline />
                <ToastContainer />
                <Typography variant="h4" align="center" className={classes.title}>
                    FunRetro
          </Typography>
                <div className={classes.paper}>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Typography variant="h4" align="center" gutterBottom className={classes.login}>
                            Profile User
                        </Typography>
                        <ThemeProvider theme={theme}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="name"
                                label="Name"
                                name={name}
                                value={name}
                                onChange={handleChange('name')} />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                disabled
                                fullWidth
                                id="email"
                                label="Your Email"
                                name={email}
                                value={email} />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name={password}
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handleChange('password')}
                                autoComplete="current-password" />
                        </ThemeProvider>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.loginButton}>
                            Update
                        </Button>
                        <Link to="/dashboard" className={classes.link}>
                            <Button
                                className={classes.signupButton}
                                fullWidth
                                variant="contained"
                                color="primary">
                                Back to DashBoard
                            </Button>
                        </Link>
                    </form>
                </div>
            </Container>
        </NarBar>
    );
}