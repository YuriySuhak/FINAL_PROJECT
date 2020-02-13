/* eslint-disable */
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
// import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { useStyles } from "./useStyles";

import {
  selectSizes,
  removeSizes,
  toggleSizeCheck,
  filters,
} from "../../../store/actions/Filters";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})(props => (
  <Checkbox color="default" inputProps={{ name: "color" }} {...props} />
));

const SizeCheckbox = ({
  size,
  selectSizes,
  removeSizes,
  filters,
  toggleSizesCheck,
  sizesChecked,
}) => {
  const classes = useStyles();

  let arrColor = [];
  const isChecked = () => {
    if (filters.sizes) {
      console.log("filters.color", filters.sizes);
      arrColor = filters.sizes.split(",");
    }
    return arrColor.includes(size.name);
  };
  const [check, setCheck] = useState(isChecked());
  console.log("check", check);

  const handleOnClick = (event, sizes) => {
    setCheck(event.target.checked);

    if (isChecked()) {
      arrColor = filters.sizes.split(",");
      const cleanColor = arrColor.filter(x => x !== sizes.name);
      const cleanColorToString = cleanColor.join(",");
      removeSizes(cleanColorToString);
    } else {
      selectSizes(size);
    }
  };

  return (
    <ListItem button key={size._id}>
      <FormControlLabel
        control={
          <GreenCheckbox
            onClick={event => {
              handleOnClick(event, size);
            }}
            value={size.name}
            checked={check}
          />
        }
        className={classes.text}
        label={size.name.charAt(0).toUpperCase() + size.name.slice(1)}
      />
    </ListItem>
  );
};

function mapStateToProps(state) {
  return {
    sizesChecked: state.filterReducer.sizesChecked,
    sizeListing: state.filterReducer.sizeListing,
    filters: state.filterReducer.filters,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectSizes: event => dispatch(selectSizes(event)),
    removeSizes: event => dispatch(removeSizes(event)),
    toggleColorCheck: event => dispatch(toggleColorCheck(event)),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SizeCheckbox)
);