import React, {FC, useState} from 'react';
import './DropdownMenu.scss';
import {IDocument} from "../../models/IDocument";

interface IProps {
  documents: IDocument[];
}

const DropdownMenu: FC<IProps> = ({ documents }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={'drop-menu ' + (isOpen ? 'drop-menu--open' : '')}>
      <button className={'drop-menu__button drop-menu__button--primary ' + (isOpen ? 'drop-menu__button--open' : '')}
              onClick={toggleMenu}
      >Выбор шаблона документ</button>

      {isOpen && <ul className="drop-menu__list">
        {documents.map((document) => {
          return (
            <li key={document.id} className="drop-menu__item">
              <button className="drop-menu__button">{document.name}</button>
            </li>
          )
        })}
      </ul>}
    </div>
  )
}

export default DropdownMenu;
