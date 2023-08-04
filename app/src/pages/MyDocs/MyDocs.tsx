import React, {FC, useContext} from 'react';
import './MyDocs.scss';
import { observer } from "mobx-react-lite";
import DocsMain from "../../components/DocsMain/DocsMain";
import {Context} from "../../index";

const MyDocs: FC = () => {
  const { store } = useContext(Context);

  return (
    <DocsMain documents={store.documents}/>
  )
}

export default observer(MyDocs);
