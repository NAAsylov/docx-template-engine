import React, {ChangeEvent, FC, useContext, useEffect, useRef, useState} from 'react';
import { Context } from "../../index";
import { observer } from 'mobx-react-lite';
import './Header.scss';
import {Link, NavLink, useHistory} from "react-router-dom";
import ModalUploadFile from "../ModalUploadFile/ModalUploadFile";

const Header: FC = () => {
  const { store } = useContext(Context);
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);

  const [isBurgerActive, setIsBurgerActive] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [fileBase64, setFileBase64] = useState<string | ArrayBuffer>('');

  const toggleBurger = (is_burger_active: boolean) => {
    if (!is_burger_active) {
      document.querySelector('.header')?.classList.add('active');
      document.querySelector('.menu__burger')?.classList.add('active');
      document.querySelector('.menu__body')?.classList.add('active');
      document.body.classList.add('lock');
    } else {
      document.querySelector('.header')?.classList.remove('active');
      document.querySelector('.menu__burger')?.classList.remove('active');
      document.querySelector('.menu__body')?.classList.remove('active');
      document.body.classList.remove('lock');
    }
  }

  const uploadFile = () => {
    inputRef?.current?.click();
  }

  const toBase64: (file: File) => Promise<string | ArrayBuffer | null> = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    const file_base64 = await toBase64(file);

    if (file_base64) {
      setFileBase64(file_base64);
      setIsOpenModal(true);
    }
  };

  const closeModal = () => {
    setIsOpenModal(false);

    if (inputRef?.current?.files) {
      inputRef.current.files = null;
    }
  }

  const clickLogout = async () => {
    await store.logout();

    history.push('/login');
  };

  return (
    <>
      { isOpenModal && <ModalUploadFile closeModal={closeModal} file={fileBase64} /> }
      <header className="header">
        <div className="header__content _container">
          <div className="header__menu menu">
            <div className="menu__logo">
              <img
                src={require('../../assets/images/logo.png')}
                alt=""
                height={'64px'}
                width={'54px'}
              />
            </div>
            <div className="menu__burger burger-menu" onClick={() => {
              setIsBurgerActive(!isBurgerActive);
              toggleBurger(isBurgerActive);
            }
            }>
              <span></span>
            </div>
            <nav className="menu__body">
              <ul className="menu__list">
                <li>
                  <input
                    style={{display: 'none'}}
                    ref={inputRef}
                    type="file"
                    onChange={handleFileChange}
                  />
                  <button className="menu__link menu__link--button menu-link" onClick={uploadFile}>
                    Загрузить шаблон
                  </button>
                </li>
                <li>
                  <NavLink activeClassName="menu__link--active" to="/docs/common" className="menu__link">Общие документы</NavLink>
                </li>
                <li>
                  <NavLink activeClassName="menu__link--active" to="/docs/my" className="menu__link">Мои документы</NavLink>
                </li>
                <li>
                  <button className="menu__link menu__link--button menu-link" onClick={clickLogout}>
                    Выход
                    <span className="menu-link__icon"></span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

export default observer(Header);
