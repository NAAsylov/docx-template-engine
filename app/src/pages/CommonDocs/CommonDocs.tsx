import React, {FC, useContext, useEffect} from 'react';
import './CommonDocs.scss';
import { observer } from "mobx-react-lite";
import {Context} from "../../index";
import DocsMain from "../../components/DocsMain/DocsMain";

const CommonDocs: FC = () => {
  const { store } = useContext(Context);

  return (
    <DocsMain documents={store.documents}/>
  )
}

export default observer(CommonDocs);
