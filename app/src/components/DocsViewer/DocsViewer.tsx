import React, {FC, useContext, useState} from 'react';
import { observer } from "mobx-react-lite";
import './DocsViewer.scss';
import {Context} from "../../index";

interface IProps {}

const DocsViewer: FC<IProps> = (props) => {
  return (
    <div>
      ТУТ БУДЕТ ПРЕВЬЮ ДОКУМЕНТА
    </div>
  )
}

export default observer(DocsViewer);
