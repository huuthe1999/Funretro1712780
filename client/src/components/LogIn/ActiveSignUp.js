import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, Redirect } from "react-router-dom";
import { isAuthUser } from '../../helper/authUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import jwt from 'jsonwebtoken';

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


export default function ActiveSignUp({ match }) {
    const classes = useStyles();
    const [form, setForm] = useState({
        name: '',
        token: '',
    });
    const { token, name } = form;

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);
        if (token) {
            setForm({ ...form, token, name });
        };
    }, [match.params]);// eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('/api/active', { token }).then(res => {
            toast.success(`${res.data.message}`)
        }).catch(err => {
            toast.error(`${err.response.data.errors}`)
        });
    };

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <ToastContainer />
            {isAuthUser() ? <Redirect to='/dashboard' /> : null}
            <Typography variant="h4" align="center" className={classes.title}>
                FunRetro
            </Typography>
            <div className={classes.paper}>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Typography variant="h4" align="center" className={classes.title}>
                        Hi {name}
                    </Typography>
                    <Typography variant="h4" align="center" gutterBottom className={classes.active}>
                        Active User
                    </Typography>
                    <Button
                        className={classes.activeButton}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary">
                        Active Your Account
                    </Button>
                    <Typography align="center" gutterBottom className={classes.or}>Or&nbsp;
                    </Typography>
                    <Link to="/login" className={classes.link}>
                        <Button
                            className={classes.signupButton}
                            fullWidth
                            variant="contained"
                            color="primary">Sign In
                    </Button></Link>
                </form>
            </div>
        </Container>
    );
}