import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import AddTask from './AddTask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '30px 40px',
    },
    paper: {
        // maxWidth: 400,
        width: '100%',
        margin: `${theme.spacing(2)}px auto`,
        padding: theme.spacing(2),
    },
    columnHeader: {
        fontSize: '1.2em',
        textAlign: 'center',
    },
    columnNameHeader: {
        margin: '0 auto',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover $editIconColumn': {
            display: 'inline-block',
        },
    },
    buttonAdd: {
        width: '100%',
        padding: '8px',
        margin: '20px 0 10px'
    },
    editIconColumn: {
        display: 'none',
        '&:hover': {
            color: '#fa0505'
        },
    },
    form: {
        display: 'flex',
    },
    formInput: {
        width: '70%',
        padding: '2px 5px',
        fontWeight: 'bold',
        marginRight: '5px'
    },
    formButton: {
        margin: '0 5px',
        backgroundColor: '#00c853',
        '&:hover': {
            backgroundColor: '#00a946',
        }
    },
    formButtonCanCel: {
        margin: '0 5px',
        backgroundColor: '#aaa',
        '&:hover': {
            backgroundColor: '#999999',
        }
    },
}));

const colorColumns = ['#8e24aa', '#2196f3', '#009688'];

export default function BoardColumn({ column, handleEditNameColumn, handleAddTask, children }) {

    const classes = useStyles();
    const [showEditColumnHeader, setShowEditColumnHeader] = useState(false);
    const [showEditTask, setShowEditTask] = useState(false);
    const [form, setForm] = useState({
        columnNameHeader: '',
        type: '',
    });

    useEffect(() => {
        setForm({ columnNameHeader: column.name, type: column.type });
    }, [column.name, column.type])// edited

    const { columnNameHeader, type } = form;

    const handleShowEditColumnHeader = () => {
        setShowEditColumnHeader(true);
    }

    const handleHidenEditColumnHeader = () => {
        setShowEditColumnHeader(false);
    }

    const handleShowEditTask = () => {
        setShowEditTask(!showEditTask);
    }

    const handleChange = text => e => {
        setForm({ ...form, [text]: e.target.value });
    }

    const handleSubmitNameColumn = e => {
        e.preventDefault();
        if (!columnNameHeader) {
            toast.error('Tên Cột không được rỗng')
        } else {
            handleEditNameColumn({ type, columnNameHeader });
            handleHidenEditColumnHeader();
        }
    }

    const columnHeader = (
        <div className={classes.columnHeader}>
            <Typography
                style={{ display: 'flex' }}
                variant="h4"
                color="primary">
                <Avatar style={{ marginRight: '10px', backgroundColor: `${colorColumns[type]}` }}>{column.comment.length}</Avatar>
                <div
                    onClick={handleShowEditColumnHeader}
                    className={classes.columnNameHeader}>
                    {columnNameHeader}
                    <IconButton size="small" style={{ margin: '0 0 8px 10px' }}>
                        <EditIcon className={classes.editIconColumn} />
                    </IconButton>
                </div>

            </Typography>
        </div>
    )

    const editColumnHeader = (
        <form noValidate autoComplete="off" className={classes.form} onSubmit={handleSubmitNameColumn}>
            <TextField
                className={classes.formInput}
                id="standard-basic"
                defaultValue={columnNameHeader}
                onChange={handleChange('columnNameHeader')}
                autoFocus
            />
            <Button
                className={classes.formButton}
                type="submit"
                size="small"
                variant="contained"
                color="secondary">
                Save
            </Button>
            <Button
                onClick={() => {
                    handleHidenEditColumnHeader();
                    setForm({ ...form, columnNameHeader: column.name });
                }}
                className={classes.formButtonCanCel}
                size="small"
                variant="contained"
                color="secondary">
                Cancel
             </Button>
        </form>
    )

    return (
        <>
            <ToastContainer />
            <Grid item xs={12} sm={6} md={4} >
                {showEditColumnHeader ? editColumnHeader : columnHeader}
                <div className={classes.columnHeader}>
                    <Button
                        onClick={handleShowEditTask}
                        className={classes.buttonAdd}
                        variant="contained"
                        color="default"
                        startIcon={<AddIcon style={{ fontSize: 30 }} />} >
                    </Button>
                </div>
                {showEditTask ? <AddTask
                    colorBackground={colorColumns[type]}
                    type={type}
                    handleAddTask={handleAddTask}
                    handleShowEditTask={handleShowEditTask}
                /> : null}
                {children}
            </Grid>
        </>
    )
}
