import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import jwt from "jwt-decode";

import HomePage from "../pages/HomePage/HomePage";
import CartPage from "../pages/CartPage/CartPage";
import Profiler from "../pages/Profiler/Profiler";
import LoginForm from "../components/LoginForm";
import NotFound from "../pages/NotFound/NotFound";
import RegistrationForm from "../components/RegistrationForm";
import ItemDetailsPage from "../pages/ItemDetailsPage/ItemDetailsPage";
import setAuthToken from "../components/common/setAuthToken";
import Preloader from "../components/Preloader";
import {
  getUser,
  preloaderClose,
  userFromJwt,
} from "../store/actions/loginActions";
import { getWishlist } from "../store/actions/wishlist";
import SearchPage from "../pages/SearchPage/SearchPage";
import Shop from "../pages/Shop/Shop";

const Routes = ({
  isAuthenticated,
  getUserData,
  getWishlistData,
  preloaderClosing,
  preloader,
  userDataFromJwt,
}) => {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const token = localStorage.getItem("authToken");
    if (token) {
      userDataFromJwt(jwt(token));
      preloaderClosing();
      setAuthToken(token);
      getWishlistData();
      getUserData();
    } else {
      preloaderClosing();
    }
  }, [getUserData, getWishlistData, preloaderClosing, userDataFromJwt]);

  // eslint-disable-next-line no-nested-ternary
  return preloader ? (
    <Preloader />
  ) : isAuthenticated ? (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/cart">
        <CartPage />
      </Route>
      <Route path="/search">
        <SearchPage />
      </Route>
      <Route path="/shop">
        <Shop />
      </Route>
      <Route path="/notfound">
        <NotFound />
      </Route>
      <Route path="/profile">
        <Profiler />
      </Route>
     
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/cart">
        <CartPage />
      </Route>
      <Route path="/search">
        <SearchPage />
      </Route>
      <Route path="/shop">
        <Shop />
      </Route>
      {/* <Route path="/about-us"> */}

      {/* </Route> */}
      <Route path="/notfound">
        <NotFound />
      </Route>
      <Route path="/login">
        <LoginForm />
      </Route>
      <Route path="/registration">
        <RegistrationForm />
      </Route>
      <Route path="/products/:id">
        <ItemDetailsPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.loginReducer.isAuthenticated,
    user: state.loginReducer.user,
    preloader: state.loginReducer.loginPreloader,
  };
}

export default connect(mapStateToProps, {
  getUserData: getUser,
  getWishlistData: getWishlist,
  preloaderClosing: preloaderClose,
  userDataFromJwt: userFromJwt,
})(Routes);
