import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

const Scroller = () => {
  const classes = useStyles();

  return (
    <div id="scroller">
      <div className={classes.root}>
        <Typography id="discrete-slider" gutterBottom>
          Node Tree Height
        </Typography>
        <Slider
          defaultValue={3}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={5}
        />
      </div>
    </div>
  );
};

export default Scroller;
