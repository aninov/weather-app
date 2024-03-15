import { ChangeEventHandler } from 'react';
import RadioButton from './RadioButton';
import './SelectUnits.css';

type SelectUnitsProps = {
  handleOnChange: ChangeEventHandler<HTMLInputElement>;
  selectedUnits: string;
};

const SelectUnits = (props: SelectUnitsProps) => {
  const { handleOnChange, selectedUnits } = props;
  const options = [
    {
      id: 'celsius',
      value: 'C',
    },
    {
      id: 'fahrenheit',
      value: 'F',
    },
    {
      id: 'kelvin',
      value: 'K',
    },
  ];

  return (
    <div className="selectUnits">
      {options.map((option) => {
        return (
          <RadioButton
            key={option.id}
            id={option.id}
            name="units"
            value={option.value}
            onChange={handleOnChange}
            defaultChecked={selectedUnits === option.value}
          />
        );
      })}
    </div>
  );
};

export default SelectUnits;
