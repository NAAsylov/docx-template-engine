import React, { FC } from 'react';
import { observer } from "mobx-react-lite";
import './DocsMain.scss';
import DocsEditor from "../DocsEditor/DocsEditor";
import DocsViewer from "../DocsViewer/DocsViewer";

const DocsMain: FC = () => {
  return (
    <div className="docs">
      <div className="docs__editor">
        <DocsEditor/>
      </div>
      <div className="docs_viewer">
        <DocsViewer/>
      </div>
    </div>
  )
}

export default observer(DocsMain);
