export interface RadioOption {
    value: string;
    label: string;
  }
 
export  interface RadioGroupProps {
    options: RadioOption[];
    onChange: (value: string) => void;
  } 