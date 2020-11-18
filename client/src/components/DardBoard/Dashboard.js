import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import UrlIcon from '../../library/icons/copy-solid.svg';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Paper } from '@material-ui/core';
import DarkBoardControl from './DardboardControl';
import AddBoardButton from './AddBoardButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import InfoIcon from '@material-ui/icons/Info';
import Menu from '@material-ui/core/Menu';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import NarBar from '../Header/NarBar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { isAuthUser, getCookie, updateUser } from '../../helper/authUser';
import DeleteBoardModal from './DeleteBoardModal';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '30px 40px',
    backgroundColor: '#f3f3f3'
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 3px 5px 0 rgba(0,0,0,.16),0 5px 10px 0 rgba(0,0,0,1.44)'
    }
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    padding: '25px'
  },
  button: {
    margin: theme.spacing(1),
    color: '#8e24aa',
  },
  buttonDelete: {
    marginRight: '5px',
    color: '#8e24aa',
  },
  iconTime: {
    color: '#8e24aa',
    position: 'absolute',
    top: '0',
    left: '0',
  },
  time: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    paddingLeft: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  publicBoard: {
    position: 'relative',
    margin: '2em 0 1em 0',
    color: '#283593',
    fontWeight: '600',
    zIndex: '10',
    '&::before': {
      display: 'block',
      position: 'absolute',
      content: '""',
      right: '0',
      bottom: '0',
      top: '50%',
      backgroundColor: '#2196F3',
      height: '0.08em',
      margin: '0 auto',
      zIndex: '-1',
      width: '70%'
    }
  },
  publicBoardSpan: {
    paddingRight: '15px',
    backgroundColor: '#f3f3f3'
  },
  publicBoardSmall: {
    fontSize: '0.9em',
    fontWeight: 'normal',
    color: '#777',
    marginLeft: '0.5em'
  },
  title: {
    color: '#283593',
    paddingBottom: '10px',
    margin: '20px 20px 0 0 ',
    fontWeight: 'bold'
  },
  cardActions: {
    justifyContent: 'space-between',
    borderTop: '1px solid #f1f1f1'
  },
  sectionMobile: {
    display: 'flex',
    [
      theme
        .breakpoints
        .up('md')
    ]: {
      display: 'none'
    }
  }
}));


export default function Dashboard({ history }) {
  const classes = useStyles();
  const [boardList, setBoardList] = useState([]);
  const [boardSelectId, setBoardSelectId] = useState(null);
  const [displayDeleteBoardModal, setdisplayDeleteBoardModal] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    const token = getCookie('token');
    axios.get(`/api/dashboard/${isAuthUser()._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      const response = res.data.resultlistBoard;
      setBoardList(response);
    }).catch(err => {
      toast.dark('Tạo công việc mới nào');
    });
  }, [isAuthUser()._id]);// eslint-disable-line react-hooks/exhaustive-deps


  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    handleMobileMenuClose();
  };

  const handleShowModal = () => {
    setdisplayDeleteBoardModal(true);
  }
  const handleHiddenModal = () => {
    setdisplayDeleteBoardModal(false);
  }

  const AddBoard = (data) => {
    const newBoard = {
      idUser: isAuthUser()._id,
      nameBoard: data.name,
      contentBoard: data.content
    };
    const token = getCookie('token');
    axios.post(`/api/dashboard/${isAuthUser()._id}/add`, { ...newBoard }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      updateUser(res, () => {
        setBoardList(boardList.concat(res.data.board));
        toast.success('Thêm bảng thành công');
      });
    }).catch(err => console.log(err));
  }

  const handleDeleteBoard = () => {
    const token = getCookie('token');
    axios.delete(`/api/dashboard/${isAuthUser()._id}/delete/${boardSelectId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      updateUser(res, () => {
        setBoardList(boardList.filter(item => item._id !== res.data.board._id));
        toast.success('Xóa bảng thành công');
        setBoardSelectId(null);
      });
    }).catch(err => console.log(err));
  }
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem onClick={() => {
        handleMenuClose();
        handleShowModal();
      }}>
        <IconButton
          className={classes.buttonDelete}
          edge='start'
          aria-label="delete current board"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <DeleteIcon />
        </IconButton>
        <p className={classes.button}>Xóa</p>
      </MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>

      <CssBaseline />
      <ToastContainer />
      <NarBar>
        <Container maxWidth="xl" className={classes.root}>
          <Typography
            variant="h5"
            color="primary"
            display="inline"
            className={classes.title}>My boards</Typography>
          < DarkBoardControl />
          <div className={classes.publicBoard}>
            <Typography component="span" variant="body1" className={classes.publicBoardSpan}>
              Public boards
          <Typography component="small" className={classes.publicBoardSmall}>
                collaborate by sharing URL with people
          </Typography>
            </Typography>
          </div>

          <Container className={classes.cardGrid} maxWidth="xl">
            <Grid container spacing={3} component="span">
              <AddBoardButton onAddBoard={AddBoard} />
              {boardList ? (
                boardList.map((card) => (
                  <Grid item xs={12} sm={6} md={3} key={card._id}>
                    <Card className={classes.card} >
                      <CardContent className={classes.cardContent} onClick={() => {
                        history.push(`/board/${isAuthUser()._id}/${card._id}`)
                      }}>
                        <Typography gutterBottom variant="h5" style={{ marginLeft: 6 }}>
                          {card.name.trim()}
                        </Typography>
                        <Typography className={classes.time} variant="subtitle2">
                          <Paper elevation={0} component="span">
                            <AccessTimeIcon className={classes.iconTime} />
                          </Paper>
                          {card.created}
                        </Typography>
                        {card.column_header.reduce((count, current) => count + current.comment.length, 0) > 0 ? (
                          <Typography className={classes.time} variant="button">
                            <Paper elevation={0} component="span">
                              <InfoIcon className={classes.iconTime} />
                            </Paper>
                            {(card.column_header.reduce((count, current) => count + current.comment.length, 0)).toString().concat(' ', 'cards')}
                          </Typography>
                        ) : null}
                        <Typography variant="subtitle1" style={{ marginLeft: 8 }}>
                          {card.content_context.trim()}
                        </Typography>
                      </CardContent>
                      <CardActions className={classes.cardActions}>
                        <Button
                          size="medium"
                          color="primary"
                          startIcon={<Icon><img src={UrlIcon} alt=""></img> </Icon>}
                          className={classes.button}>
                          URL
                      </Button>
                        <Button
                          size="medium"
                          color="primary"
                          startIcon={< FileCopyIcon />}
                          className={classes.button}>
                          CLONE
                      </Button>
                        <IconButton
                          aria-label="settings"
                          aria-controls={mobileMenuId}
                          aria-haspopup="true"
                          onClick={e => {
                            setMobileMoreAnchorEl(e.currentTarget);
                            setBoardSelectId(card._id);
                          }}
                          color="inherit">
                          <MoreVertIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              ) : null}
            </Grid>
          </Container>
        </Container>
      </NarBar>
      {renderMobileMenu}
      {displayDeleteBoardModal ? <DeleteBoardModal handleToggleModal={handleHiddenModal} handleDeleteBoard={handleDeleteBoard} /> : null}
    </React.Fragment>
  );
}
