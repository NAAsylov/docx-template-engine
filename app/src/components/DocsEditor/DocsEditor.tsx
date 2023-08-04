import React, {FC, useContext, useState} from 'react';
import { observer } from "mobx-react-lite";
import './DocsEditor.scss';
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import {Context} from "../../index";
import Input from "../Input/Input";

const DocsEditor: FC = () => {
  const { store } = useContext(Context);

  const [fio, setFio] = useState<string>('');
  const [countDay, setCountDay] = useState<number>(0);

  const fields: Array<{ Component: FC<any>; props: { [key: string]: any } }> = [
    {
      Component: Input,
      props: {
        label: 'ФИО',
        placeholder: 'Иванов Иван Иванович',
        onChange: setFio,
      }
    },
    {
      Component: Input,
      props: {
        label: 'Кол-во дней',
        placeholder: '14',
        onChange: setCountDay,
      }
    },
  ];

  const downlaod = () => {
    if (store.current_document?.id) {
      store.downloadFile(store.current_document?.id, fio, countDay);
    }
  }

  return (
    <div className="docs-editor">
      <button className="docs-editor__button" onClick={downlaod}>Скачать</button>
      <DropdownMenu documents={store.documents} onSelect={store.setCurrentDocument.bind(store)}></DropdownMenu>
      {fields.map(({ Component, props }, idx) => (<Component key={idx} { ...props }/>))}
    </div>
  )
}

export default observer(DocsEditor);
