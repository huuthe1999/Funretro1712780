import React, { useState, useEffect } from 'react'
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import EventIcon from '@material-ui/icons/Event';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import DeleteTaskModal from './DeleteTaskModal';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        margin: `${theme.spacing(2)}px auto`,
        padding: theme.spacing(2),
        color: '#fff'
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
        },
    },
    buttonHoverIconDelete: {
        '&:hover': {
            color: '#FF0000'
        },
    },
    input: {
        marginLeft: theme.spacing(1),
        width: '100%',
    },
}));

export default function Task({ content, handleEditTask, columnIndex, taskIndex, handleDeleteTask, colorBackground }) {
    const classes = useStyles();
    const [showEditTask, setShowEditTask] = useState(false);
    const [contentTask, setContent] = useState('');
    const [displayDeleteTaskModal, setdisplayDeleteTaskModal] = useState(false);

    useEffect(() => {
        setContent(content.content);
    }, [content.content])

    const handleShowModal = () => {
        setdisplayDeleteTaskModal(true);
    }
    const handleHiddenModal = () => {
        setdisplayDeleteTaskModal(false);
    }

    const handleShowEditTask = () => {
        setShowEditTask(true);
    }
    const handleHiddenEditTask = () => {
        setShowEditTask(false);
    }

    const handleChange = e => {
        setContent(e.target.value);
    }

    const handleSubmitEditTask = () => {
        if (!contentTask) {
            toast.error('Nội dung Tag không được rỗng')
        } else {
            handleEditTask({ _id: content._id, contentTask, type: columnIndex });
            handleHiddenEditTask();
        }
    }
    const handleSubmitDeleteTask = () => {
        handleDeleteTask({ _id: content._id, type: columnIndex });
    }
    const defaultNameTask = (
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs={11}>
                <div style={{ display: 'flex', marginBottom: '0.35em' }}>
                    <EventIcon />
                    <Typography variant="body1" className={classes.title} style={{ marginLeft: 10 }}>
                        {content.timeCreated}
                    </Typography>
                </div>
                <Typography variant="h6" className={classes.title}>
                    {content.content}
                </Typography>
            </Grid>
            <Grid item container xs={1} spacing={2}>
                <Tooltip title="Edit">
                    <IconButton
                        onClick={handleShowEditTask}
                        size="small"
                        className={classes.buttonHoverIconSave}
                        style={{ marginBottom: '6px' }}>
                        <EditIcon style={showEditTask ? { color: '#555' } : { color: '#fff' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        onClick={handleShowModal}
                        size="small"
                        className={classes.buttonHoverIconDelete}>
                        <DeleteIcon style={showEditTask ? { color: '#555' } : { color: '#fff' }} />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    )
    const editNameTask = (
        <Grid container wrap="nowrap" spacing={2} className={classes.content}>
            <Grid item xs={11}>
                <InputBase
                    autoFocus
                    multiline
                    rowsMax={3}
                    onChange={handleChange}
                    defaultValue={content.content}
                    className={classes.input}
                    placeholder="Type in here"
                    inputProps={{ 'aria-label': 'Title Name Column' }}
                />
            </Grid>
            <Grid item container xs={1} spacing={2}>
                <Tooltip title="Save">
                    <IconButton
                        onClick={handleSubmitEditTask}
                        size="small"
                        className={classes.buttonHoverIconSave}
                        style={{ marginBottom: '6px' }}>
                        <SaveIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Exit">
                    <IconButton
                        onClick={handleHiddenEditTask}
                        size="small"
                        className={classes.buttonHoverIconDelete}>
                        <CancelIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    )

    return (
        <>
            <Draggable
                index={taskIndex}
                draggableId={content._id}
                isDragDisabled={showEditTask}
            >
                {
                    provided => (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            {
                                <Paper
                                    className={classes.paper}
                                    style={{ backgroundColor: `${colorBackground}` }}>
                                    {showEditTask ? editNameTask : defaultNameTask}
                                </Paper>
                            }
                        </div>
                    )
                }
            </Draggable>
            {displayDeleteTaskModal ? <DeleteTaskModal handleToggleModal={handleHiddenModal} handleDeleteTask={handleSubmitDeleteTask} /> : null}
        </>
    )
}
