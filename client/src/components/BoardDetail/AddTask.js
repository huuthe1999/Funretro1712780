import React, { useState } from 'react'
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        margin: `${theme.spacing(2)}px auto`,
        padding: theme.spacing(2),
        // backgroundColor: '#8e24aa'
    },
    content: {
        backgroundColor: '#fff'
    },
    columnHeader: {
        fontSize: '1.2em',
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover $editIconColumn': {
            display: 'inline-block',
        },
    },
    buttonHoverIconSave: {
        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    buttonHoverIconDelete: {
        '&:hover': {
            color: '#FF0000'
        }
    },
    input: {
        marginLeft: theme.spacing(1),
        width: '100%',
    },
}));


export default function AddTask({ handleShowEditTask, handleAddTask, type, colorBackground }) {
    const classes = useStyles();
    const [content, setContent] = useState(null);

    const handleChange = e => {
        setContent(e.target.value);
    }

    const handleSubmitTasks = () => {
        if (!content) {
            toast.error('Nội dung Task không được rỗng')
        } else {
            handleAddTask({ content: content, type: type });
            setContent(null);
            handleShowEditTask();
        }
    }
    return (
        <>
            <ToastContainer />
            <Paper className={classes.paper} style={{ backgroundColor: `${colorBackground}` }}>
                <Grid container wrap="nowrap" spacing={2} className={classes.content}>
                    <Grid item xs={11}>
                        <InputBase
                            onChange={handleChange}
                            autoFocus
                            multiline
                            rowsMax={3}
                            className={classes.input}
                            placeholder="Type in here"
                            inputProps={{ 'aria-label': 'Title Name Column' }}
                        />
                    </Grid>
                    <Grid item container xs={1} spacing={2}>
                        <Tooltip title="Save">
                            <IconButton
                                onClick={handleSubmitTasks}
                                size="small"
                                className={classes.buttonHoverIconSave}
                                style={{ marginBottom: '6px' }}>
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton
                                onClick={handleShowEditTask}
                                size="small"
                                className={classes.buttonHoverIconDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}
