import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from "../../index";
import { observer } from 'mobx-react-lite';
import './Login.scss';

const Login: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context);
  const history = useHistory();

  if (store.is_auth) {
    history.push('/');
  }

  const login = async () => {
    /** TODO: Добавить нормальную валидацию и вывод ошибок на форму. */
    if (!email) {
      alert('Введите Email!');
      return;
    }

    if (!password) {
      alert('Введите пароль!');
      return;
    }

    await store.login(email, password);

    if (store.is_auth) {
      history.push('/');
    }
  }

  return (
    <div className="auth">
      <div className="_container">
        <div className="auth__content">
          <div className="auth__title">Авторизация</div>
          <form className="auth__form auth-form">
            <div className="auth-form__inputs auth-inputs">
              <input className="auth-inputs__item"
                     type="text"
                     placeholder="Email"
                     required
                     onChange={e=> setEmail(e.target.value)}
                     value={email}
              />
              <span className="auth-inputs__separator"></span>
              <input className="auth-inputs__item"
                     type="password"
                     placeholder="Пароль"
                     required
                     onChange={e=> setPassword(e.target.value)}
                     value={password}
              />
            </div>

            <button className="auth-form__button"
                    type="button"
                    onClick={login}
            >Вход</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default observer(Login);
