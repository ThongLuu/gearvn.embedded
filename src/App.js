import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Route, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Provider } from "react-redux";
import { addLocale } from "primereact/api";
import { Tooltip } from "primereact/tooltip";
import PrimeReact from "primereact/api";
import moment from "moment";

import Loading from "./components/Loading";
import backendService from "./services/backend.services.js";

import store from "./redux/store";

//import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./style/flags/flags.css";
import "./style/layout.scss";
import "./App.scss";
import SuggestProductComponent from "./components/SuggestProduct/index.js";

const App = () => {
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    return (
        <Provider store={store}>
            <SuggestProductComponent />
            <Loading show={loading} />
        </Provider>
    );
};

export default App;
