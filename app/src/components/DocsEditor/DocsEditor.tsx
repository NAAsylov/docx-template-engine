import React, {FC, useContext} from 'react';
import { observer } from "mobx-react-lite";
import './DocsEditor.scss';
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import {Context} from "../../index";

const DocsEditor: FC = () => {
  const { store } = useContext(Context);

  return (
    <div className="docs-editor">
      <DropdownMenu documents={store.documents}></DropdownMenu>
    </div>
  )
}

export default observer(DocsEditor);
