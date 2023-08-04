import React, {FC, useContext, useState} from 'react';
import { observer } from "mobx-react-lite";
import './ModalUploadFile.scss';
import {Context} from "../../index";
import {TDocumentType} from "../../models/IDocument";

interface IProps {
  file: string | ArrayBuffer;
  closeModal: () => void;
}

const ModalUploadFile: FC<IProps> = ({ file, closeModal }) => {
  const { store } = useContext(Context);

  const [name, setName] = useState<string>('');
  const [type, setType] = useState<TDocumentType>('public');

  const uploadDocument = async () => {
    const res = await store.uploadFile(name, type, file);

    if (res?.status === 200) {
      closeModal();
    }
  }

  return (
    <>
      <div className="dark-background" onClick={closeModal}></div>
      <div className="modal">
        <div className="_container">
          <div className="modal__content">
            <div className="modal__title">Настройки документа</div>
            <form className="modal__form modal-form">
              <div className="modal-form__inputs">
                <input className="modal-inputs__item"
                       type="text"
                       placeholder="Название документа"
                       required
                       onChange={e=> setName(e.target.value)}
                       value={name}
                />
                <span className="auth-inputs__separator"></span>
                <div className="modal-inputs__item modal-inputs__item--radio">
                  <div>
                    <input className="modal-inputs__item"
                           id="public"
                           type="radio"
                           checked={type === 'public'}
                           onChange={() => setType('public')}
                           value="public"
                    />
                    <label htmlFor="public">Общий</label>
                  </div>
                  <div>
                    <input className="modal-inputs__item"
                           id="private"
                           type="radio"
                           checked={type === 'private'}
                           onChange={() => setType('private')}
                           value="private"
                    />
                    <label htmlFor="private">Личный</label>
                  </div>
                </div>
              </div>

              <div className="modal-form__buttons">
                <button className="modal-form__button"
                        type="button"
                        onClick={uploadDocument}
                >Загрузить</button>

                <button className="modal-form__button"
                        type="button"
                        onClick={closeModal}
                >Отмена</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default observer(ModalUploadFile);
