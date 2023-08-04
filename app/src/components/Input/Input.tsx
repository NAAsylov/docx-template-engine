import React, { FC } from 'react';
import './Input.scss';

interface IProps {
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const Input: FC<IProps> = (props) => {
  const { label, placeholder, onChange } = props;

  return (
    <div className="input-block">
      <label className="input-block__label">{label}:</label>
      <input className="input-block__input"
             type="text"
             placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default Input;
