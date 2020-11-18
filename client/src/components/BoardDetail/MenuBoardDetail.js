import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: '24px',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    boardName: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '40px',
        cursor: 'pointer',
        '&:hover $boardArchived': {
            display: 'inline-block',
        },
    },
    boardArchived: {
        display: 'none',
        '&:hover': {
            color: '#fa0505'
        },
    },
    form: {
        display: 'flex',
    },
    formInput: {
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
    formContext: {
        paddingLeft: '40px',
        flex: '1 1 auto',
        marginLeft: '10px',
        margin: '0 auto',
    }
}))

const BootstrapInput = withStyles((theme) => ({
    input: {
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '2px solid #2196f3',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.4rem`,
            borderColor: '#121212',
        },
    },
}))(InputBase);

export default function MenuBoardDetail({ name, contentContext, handleEditName, handleEditContent }) {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const [form, setForm] = useState({
        nameBoard: '',
        content_context: '',
    });

    const { nameBoard, content_context } = form;
    useEffect(() => {
        setForm({ ...form, nameBoard: name, content_context: contentContext });
    }, [name, contentContext])// eslint-disable-next-line


    const handleShow = () => {
        setShow(true);
    }

    const handleHiden = () => {
        setShow(false);
    }

    const handleShowContent = () => {
        setShowContent(true);
    }

    const handleHidenContent = () => {
        setShowContent(false);
    }


    const handleChange = text => e => {
        setForm({ ...form, [text]: e.target.value });
    }

    const handleSubmitName = e => {
        e.preventDefault();
        if (!nameBoard) {
            toast.error('Tên Board không được rỗng')
        } else {
            handleEditName({ nameBoard });
            handleHiden();
        }
    }

    const handleSubmitContent = e => {
        e.preventDefault();
        if (!content_context) {
            toast.error('Tên Content Conntext không được rỗng')
        } else {
            handleEditContent({ content_context });
            handleHidenContent();
        }
    }


    const boardName = (
        <Typography variant="h6" component="span" className={classes.boardName} onClick={handleShow}>
            {nameBoard}
            <IconButton size="small" style={{ marginLeft: '10px' }}>
                <EditIcon className={classes.boardArchived} /></IconButton>
        </Typography>
    )

    const editBoardNameForm = (
        <form noValidate autoComplete="off" className={classes.form} onSubmit={handleSubmitName} style={{ width: '40%' }}>
            <TextField
                id="standard-basic"
                className={classes.formInput}
                onChange={handleChange('nameBoard')}
                defaultValue={nameBoard}
                autoFocus />
            <Button
                className={classes.formButton}
                type="submit"
                size="small"
                variant="contained"
                color="secondary">
                Save
             </Button>
            <Button
                // className={`${classes.formButton}` + ' ' + `${classes.formButtonCanCel}`}
                className={clsx(classes.formButton, classes.formButtonCanCel)}
                onClick={() => {
                    handleHiden();
                    setForm({ ...form, nameBoard: name })
                }}
                size="small"
                variant="contained"
                color="secondary">
                Cancel
        </Button>
        </form>
    )
    const editBoardContentForm = (
        <BootstrapInput
            onClick={handleShowContent}
            className={classes.formContext}
            placeholder='Set the context of the retrospective here...'
            onChange={handleChange('content_context')}
            // defaultValue={content_context}
            value={content_context}
        />
    )
    const boardContent = (
        <form noValidate autoComplete="off" className={classes.form} onSubmit={handleSubmitContent} style={{ width: '100%' }}>
            <BootstrapInput
                autoFocus
                onClick={handleShowContent}
                className={classes.formContext}
                placeholder='Set the context of the retrospective here...'
                onChange={handleChange('content_context')}
                // defaultValue={content_context}
                style={{ marginRight: '30px' }}
                value={content_context} />
            <Button
                className={classes.formButton}
                type="submit"
                size="small"
                variant="contained"
                color="secondary">
                Save
             </Button>
            <Button
                // className={`${classes.formButton}` + ' ' + `${classes.formButtonCanCel}`}
                className={clsx(classes.formButton, classes.formButtonCanCel)}
                onClick={() => {
                    handleHidenContent();
                    setForm({ ...form, content_context: contentContext });
                }}
                size="small"
                variant="contained"
                color="secondary">
                Cancel
        </Button>

        </form>
    )
    return (
        <React.Fragment>
            <ToastContainer />
            <div className={classes.root} >
                {show ? editBoardNameForm : boardName}
                {!showContent ? editBoardContentForm : boardContent}
            </div>
        </React.Fragment>
    )
}
