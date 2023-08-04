import React, {FC, useState} from 'react';
import './DropdownMenu.scss';
import {IDocument} from "../../models/IDocument";

interface IProps {
  documents: IDocument[];
  onSelect: (id: string) => void;
}

const DropdownMenu: FC<IProps> = ({ documents, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={'drop-menu ' + (isOpen ? 'drop-menu--open' : '')}>
      <button className={'drop-menu__button drop-menu__button--primary ' + (isOpen ? 'drop-menu__button--open' : '')}
              onClick={toggleMenu}
      >Выбор шаблона документ: {value}</button>

      {isOpen && <ul className="drop-menu__list">
        {documents.map((document) => {
          return (
            <li key={document.id} className="drop-menu__item">
              <button className="drop-menu__button" onClick={() => {
                onSelect(document.id);
                setValue(document.name);
                toggleMenu();
              }}>{document.name}</button>
            </li>
          )
        })}
      </ul>}
    </div>
  )
}

export default DropdownMenu;
