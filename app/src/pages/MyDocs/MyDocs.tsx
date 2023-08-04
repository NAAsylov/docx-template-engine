import React, { FC } from 'react';
import './MyDocs.scss';
import { observer } from "mobx-react-lite";
import DocsMain from "../../components/DocsMain/DocsMain";

const MyDocs: FC = () => {
  return (
    <DocsMain/>
  )
}

export default observer(MyDocs);
