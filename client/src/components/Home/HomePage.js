import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
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
    activeButton: {
        padding: '10px',
        marginTop: '20px',
        backgroundColor: '#8e24aa',
        '&:hover': {
            backgroundColor: '#9F45B7'
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
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function HomePage() {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Container component="main" maxWidth="md">
                    <CssBaseline />
                    <Typography variant="h4" align="center" className={classes.title}>
                        FunRetro
                    </Typography>
                    <div className={classes.paper}>
                        <Typography variant="h4" align="center" gutterBottom className={classes.active}>
                            Welcome to FunRetro
                    </Typography>

                        <Link to="/login" className={classes.link}>
                            <Button
                                className={classes.activeButton}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary">
                                Sign In
                        </Button>
                        </Link>
                        <Typography align="center" gutterBottom className={classes.or}>Or&nbsp;
                    </Typography>

                        <Link to="/register" className={classes.link}>
                            <Button
                                className={classes.signupButton}
                                fullWidth
                                variant="contained"
                                color="primary">
                                Sign Up
                        </Button></Link>
                    </div>
                </Container>
            </Grid>
        </Grid>
    );
}