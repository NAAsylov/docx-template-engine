import { Route, Redirect } from 'react-router-dom';
import {FC, useContext, useEffect} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";

const PrivateRoute: FC<any> = ({ component: Component, ...rest }) => {
  const { store } = useContext(Context);

  return (
    <Route {...rest} render={props => {
      if (!store.is_auth) {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }

      return <Component {...props} />
    }} />
  );
}

export default observer(PrivateRoute);
