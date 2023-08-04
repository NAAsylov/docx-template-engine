import React, {FC, useContext} from 'react';
import { observer } from "mobx-react-lite";
import './DocsEditor.scss';
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import {Context} from "../../index";
import Input from "../Input/Input";

const DocsEditor: FC = () => {
  const { store } = useContext(Context);

  const fields: Array<{ Component: FC<any>; props: { [key: string]: any } }> = [
    {
      Component: Input,
      props: {
        label: 'ФИО',
        placeholder: 'Иванов Иван Иванович',
        onChange: console.log,
      }
    },
    {
      Component: Input,
      props: {
        label: 'Должность',
        placeholder: 'Руководитель',
        onChange: console.log,
      }
    },
  ];

  return (
    <div className="docs-editor">
      <DropdownMenu documents={store.documents} onSelect={store.setCurrentDocument.bind(store)}></DropdownMenu>
      {fields.map(({ Component, props }, idx) => (<Component key={idx} { ...props }/>))}
    </div>
  )
}

export default observer(DocsEditor);
