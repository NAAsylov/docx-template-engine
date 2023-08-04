import React, { FC, useContext, useEffect } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Login from "./pages/Login/Login";
import { Context } from "./index";
import { observer } from 'mobx-react-lite';
import './styles/style.scss';
import {COMMON_DOCS_ROUTE, LOGIN_ROUTE, MY_DOCS_ROUTE} from "./utils/consts";
import PrivateRoute from "./PrivateRoute";
import Spinner from "./components/Spinner/Spinner";
import CommonDocs from "./pages/CommonDocs/CommonDocs";
import MyDocs from "./pages/MyDocs/MyDocs";
import Header from "./components/Header/Header";
import './App.scss';

const App: FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (!store.is_auth) {
      store.refresh().then(() => store.getAllDocuments());
    } else {
      store.getAllDocuments();
    }
  }, []);

  if (store.is_loading) {
    return (<Spinner/>);
  }

  return (
    <BrowserRouter>
      {store.is_auth && <Header/>}
      <div className={store.is_auth ?'main' : ''}>
        <Switch>
          <PrivateRoute path={COMMON_DOCS_ROUTE} component={CommonDocs} exact/>
          <PrivateRoute path={MY_DOCS_ROUTE} component={MyDocs} exact/>
          <Route path={LOGIN_ROUTE} component={Login} exact/>
          <Redirect from="*" to={MY_DOCS_ROUTE} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default observer(App);
