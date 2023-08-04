import React, {FC, useContext, useEffect} from 'react';
import './CommonDocs.scss';
import { observer } from "mobx-react-lite";
import {Context} from "../../index";

const CommonDocs: FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    store.getAllDocuments();
  }, [store]);

  return (
    <div>Common Docs</div>
  )
}

export default observer(CommonDocs);
