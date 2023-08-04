import React, { FC } from 'react';
import { observer } from "mobx-react-lite";
import './DocsMain.scss';
import DocsEditor from "../DocsEditor/DocsEditor";
import DocsViewer from "../DocsViewer/DocsViewer";
import {IDocument} from "../../models/IDocument";

interface IProps {
  documents: IDocument[];
}

const DocsMain: FC<IProps> = ({ documents }) => {
  return (
    <div className="docs">
      <div className="docs__editor">
        <DocsEditor/>
      </div>
      <div className="docs__viewer">
        <DocsViewer/>
      </div>
    </div>
  )
}

export default observer(DocsMain);
