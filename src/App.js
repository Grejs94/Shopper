import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  MainPage,
  BasketPage,
  ShopPage,
  SettingsPage,
  RoutePage,
  HelperPage,
} from "pages";

import { Wrapper } from "./App.css.js";

function App() {
  return (
    <Router>
      <Wrapper>
        <Switch>
          <Route path="/shopHelper">
            <HelperPage />
          </Route>
          <Route path="/basket">
            <BasketPage />
          </Route>
          <Route path="/route">
            <RoutePage />
          </Route>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/shop">
            <ShopPage />
          </Route>
          <Route exact path="/">
            <MainPage />
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  );
}

export default App;
