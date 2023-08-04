import React, {FC, useContext, useState} from 'react';
import { observer } from "mobx-react-lite";
import './DocsViewer.scss';
import {Context} from "../../index";

interface IProps {}

const DocsViewer: FC<IProps> = (props) => {
  return (
    <div>
      Docs Viewer
    </div>
  )
}

export default observer(DocsViewer);
