import React, { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Menu from './Menu';
import daycaresData from './data/daycaresData';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  alert: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    border: '1px solid',
  },
}));

export default function Filter() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [filteredDaycares, setFilteredDaycares] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleChange = (e) => {
    console.log(e.target.value, 'hello');

    setValue(e.target.value);
    let sortedDaycares = [];

    daycaresData.map((daycare) => {
      if (daycare.infant === true && e.target.value === 'infant') {
        sortedDaycares.push(daycare)
      } else if (daycare.toddler === true && e.target.value === 'toddler') {
        sortedDaycares.push(daycare)
      } else if (daycare.child === true && e.target.value === 'child') {
        sortedDaycares.push(daycare)
      }
      console.log(daycare, sortedDaycares, 'filter');
    })
  };

  return (
    <>
      <FormControl component="fieldset" style={{ padding: '10px', marginTop: '10px' }}>
        <FormLabel component="legend" style={{ fontWeight: 'bold' }}>Age</FormLabel>
        <RadioGroup aria-label="age" name="age" value={value} onChange={handleChange}>
          <FormControlLabel value="infant" control={<Radio />} label="0 -1" />
          <FormControlLabel value="toddler" control={<Radio />} label="2 - 3" />
          <FormControlLabel value="child" control={<Radio />} label="3 - 4" />
        </RadioGroup>
      </FormControl>
      <Divider />
      <div>
        <Button aria-describedby={id} variant="contained" color="default" onClick={handleClick}>
          Filter Daycares
      </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Typography className={classes.typography}>
            <Menu daycares={filteredDaycares} />
          </Typography>
        </Popover>
      </div>
    </>
  );
}