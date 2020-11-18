
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    warningIcon: {
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '50%',
        height: '7em',
        width: '7em',
        border: '.25em solid #f8bb86',
        margin: '1.25em auto 1.875em',
        alignItems: 'center',
    },
    warningText: {
        textAlign: 'center',
        fontSize: '1.7em',
        color: '#444'
    },
    swal2IconText: {
        fontSize: '3.75em',
        color: '#f8bb86',
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10px',

    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'center',
    },
    form: {
        width: '500px',
        margin: 'auto',
        padding: '0 2em 2em 2em',
        backgroundColor: '#ffffff',
        borderRadius: '0.125rem',
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)'
    },
    yesButton: {
        padding: '10px',
        marginRight: '15px',
        backgroundColor: '#e91e63',
        '&:hover': {
            backgroundColor: '#D11B59'
        }
    },
    noButton: {
        padding: '10px',
        marginLeft: '15px',
        backgroundColor: '#aaa',
        '&:hover': {
            backgroundColor: '#999999'
        }
    }
}))
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h4">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export default function DeleteBoardModal({ handleToggleModal, handleDeleteBoard }) {
    const classes = useStyles();

    const handleClose = () => {
        handleToggleModal();
    }
    const handleSubmit = e => {
        e.preventDefault();
        handleDeleteBoard();
        handleClose();
    }
    return (
        <div>
            <Dialog onClose={handleToggleModal} aria-labelledby="customized-dialog-title" open={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleToggleModal} className={classes.dialogTitle}>
                    Delete Board
                </DialogTitle>
                <DialogContent dividers>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <div className={classes.root}>
                            <div className={classes.warningIcon}><span className={classes.swal2IconText}>!</span></div>
                            <div className={classes.warningText}><Typography variant="h5" align='center'>Bạn có muốn xóa Board này không ?</Typography></div>
                        </div>
                        <div className={classes.action}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.yesButton}>
                                Có
                             </Button>
                            <Button
                                onClick={handleClose}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.noButton}>
                                Không, giữ lại
                        </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}