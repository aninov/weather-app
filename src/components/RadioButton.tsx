import { ChangeEventHandler } from 'react';
import './RadioButton.css';

type RadioButtonsProps = {
  id: string;
  value: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  defaultChecked: boolean;
};

const RadioButton = (props: RadioButtonsProps) => {
  const { id, value, name, onChange, defaultChecked } = props;
  const active = defaultChecked ? 'active' : '';
  return (
    <label
      data-testid={`radio-button-${value}`}
      className={`radio_label ${active}`}
      htmlFor={id}
    >
      <span>{id}</span>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
    </label>
  );
};

export default RadioButton;
