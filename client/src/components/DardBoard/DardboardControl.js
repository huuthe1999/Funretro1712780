import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import { purple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '40px',
    padding: '15px 10px',
    alignItems: 'center',
    background: '#fff',
    borderRadius: '3px'
  },
  titleSort: {
    paddingLeft: '20px'
  },
  sortIcon: {
    marginLeft: theme.spacing(2),
    '&:hover': {
      color: '#8e24aa'
    }
  },
  modeIcon: {
    marginLeft: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [
      theme
        .breakpoints
        .up('sm')
    ]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  switchBase: {
    color: purple[300],
    '&$checked': {
      color: purple[500]
    },
    '&$checked + $track': {
      backgroundColor: purple[500]
    },
    checked: {},
    track: {}
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme
      .transitions
      .create('width'),
    width: '100%',
    [
      theme
        .breakpoints
        .up('sm')
    ]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));
const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    '&$checked': {
      color: purple[500]
    },
    '&$checked + $track': {
      backgroundColor: purple[500]
    }
  },
  checked: {},
  track: {}
})(Switch);

export default function DarkBoardControl() {
  const classes = useStyles();

  // const handleChange = (event) => {
  //   onChange(event.target.checked);
  // }
  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{
            'aria-label': 'search'
          }} />
      </div>
      <Typography component="span" color="inherit" className={classes.titleSort}>Sort Day</Typography>
      <IconButton className={classes.sortIcon}>
        <SortIcon />
      </IconButton>
      <Typography
        component="span"
        color="inherit"
        className={classes.titleSort}>
        Dark Mode
      </Typography>
      <PurpleSwitch
        // checked={checked}
        // onChange={handleChange}
        className={classes.modeIcon} />
    </div>
  )
}
