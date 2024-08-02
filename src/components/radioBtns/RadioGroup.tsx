import { useState } from "react";
import { RadioGroupProps } from "./types";
import { RadioInput, RadioLabel, WrapRBtn } from "./styles";





const RadioGroup: React.FC<RadioGroupProps> = ({ options, onChange }) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
  
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setSelectedValue(event.target.value);
          onChange(event.target.value);
      }
 
    return (
        <WrapRBtn>
          {options.map(option => (
            <div key={option.value}>
              <RadioInput
                type="radio"
                id={option.value}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={handleChange}
              />
              <RadioLabel
                htmlFor={option.value}
                checked={selectedValue === option.value}
              >
                {option.label}
              </RadioLabel>
            </div>
          ))}
        </WrapRBtn>
      );
    };


export default RadioGroup;
