import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DarkBoardControl from './DardboardControl';
import Board from './Board';

const useStyles = makeStyles((theme) => ({
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
      width: '65%'
    }
  },
  publicBoardSpan: {
    paddingRight: '15px',
    backgroundColor: '#FAFAFA'
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
  }
}));
export default function DardboadItem() {
  const classes = useStyles();
  return (
    <>
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
      <Board />
    </>
  );
}
