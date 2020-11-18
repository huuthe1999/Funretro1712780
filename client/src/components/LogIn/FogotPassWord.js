import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import TextField from '@material-ui/core/TextField';
import NarBar from '../Header/NarBar';

// const theme = createMuiTheme({
//     palette: {
//         primary: {
//             main: '#8e24aa'
//         }
//     }
// });

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        margin: '1em 0',
        fontFamily: 'ThirstyScript',
        color: '#8e24aa',
        fontSize: '2.5em'
    },
    active: {
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
    activeButton: {
        padding: '10px',
        marginTop: '20px',
        backgroundColor: '#8e24aa',
        '&:hover': {
            backgroundColor: '#9F45B7'
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
    or: {
        margin: '10px',
    },
    link: {
        display: 'block',
        width: '100%',
        color: '#ffffff',
        textDecoration: 'none'
    }
}));


export default function FogotPassWord({ history }) {
    const classes = useStyles();
    const [form, setForm] = useState({
        email: '',
    });
    const { email } = form;

    const handleChange = text => e => {
        setForm({ ...form, [text]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (email) {
            axios.put('/api/forgot', { email }).then(res => {
                toast.success(`Vui lòng kiểm tra Email`);
            }).catch(err => {
                if (err) {
                    toast.success(`${err.response.data.errors}`);
                }
            });
        }
        else {
            toast.error(`Vui lòng điền đầy đủ thông tin !`);
        }
    };

    return (
        <NarBar>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <ToastContainer />
                <Typography variant="h4" align="center" className={classes.title}>
                    FunRetro
            </Typography>
                <div className={classes.paper}>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Typography variant="h4" align="center" gutterBottom className={classes.active}>
                            Password Reset
                    </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name={email}
                            value={email}
                            onChange={handleChange('email')}
                            autoComplete="email" />
                        <Button
                            className={classes.activeButton}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">
                            Reset Password
                    </Button>
                        <Typography align="center" gutterBottom className={classes.or}>Or&nbsp;
                    </Typography>
                        <Link to="/login" className={classes.link}>
                            <Button
                                className={classes.signupButton}
                                fullWidth
                                variant="contained"
                                color="primary">Back to Login
                    </Button></Link>

                    </form>
                </div>
            </Container>
        </NarBar>
    );
}