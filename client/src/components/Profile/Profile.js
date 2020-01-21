import React from "react";
// import PropTypes from 'prop-types';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";

import useStyles from "./useStyles";

import PersonalData from "./PersonalData/PersonalData";
import ChangePasswordForm from "./ChangePasswordForm/ChangePasswordForm";
import DeliveryAddressForm from "./DeliveryAdressForm/DeliveryAddressForm";
import WishList from "./WishList/WishList";

import { logOut } from "../../store/actions/loginActions";
import { wishlistLogOut } from "../../store/actions/wishlist";
import setAuthToken from "../common/setAuthToken";

function TabPanel(props) {
  const { children, value, index } = props;
  const classes = useStyles();

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={classes.tabpanel}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </Typography>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// eslint-disable-next-line no-shadow
const Profile = ({ logOut, wishlistLogOut }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const profileLogOut = () => {
    setAuthToken(false);
    // eslint-disable-next-line no-undef
    localStorage.removeItem("authToken");
    wishlistLogOut();
    logOut();
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab
          label="Wishlist"
          id="vertical-tab-0"
          aria-controls="vertical-tabpanel-0"
        />
        <Tab
          label="Personal Details"
          id="vertical-tab-1"
          aria-controls="vertical-tabpanel-1"
        />
        <Tab
          label="Delivery Address"
          id="vertical-tab-2"
          aria-controls="vertical-tabpanel-2"
        />
        <Tab
          label="Order History"
          id="vertical-tab-3"
          aria-controls="vertical-tabpanel-3"
        />
        <Tab
          label="Password Change"
          id="vertical-tab-4"
          aria-controls="vertical-tabpanel-4"
        />
        <Tab
          label="Log Out"
          id="vertical-tab-5"
          aria-controls="vertical-tabpanel-5"
          onClick={() => profileLogOut()}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <WishList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PersonalData />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DeliveryAddressForm />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Orders history
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ChangePasswordForm />
      </TabPanel>
    </div>
  );
};

export default connect(null, { logOut, wishlistLogOut })(Profile);
