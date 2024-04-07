import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import authServices from "./services/auth.services";
import localStorageService from "./services/localStorage.services";

/*
if (authServices.isExpired()
  && window.location.href.indexOf('/public/') < 0
  && window.location.href.indexOf('/assets/') < 0
  && window.location.href.indexOf('/media/') < 0
  && window.location.href.indexOf('/css/') < 0
  && window.location.href.indexOf('/favicon.ico') < 0
) {
  localStorageService.clear();
  window.location.href = "/logout";
}

window.addEventListener("storage", function () {
  if (authServices.isExpired() && window.location.href.indexOf('/public/') >= 0) {
    localStorageService.clear();
    return (window.location.href = window.location.origin + "/logout");
  }
});*/

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
