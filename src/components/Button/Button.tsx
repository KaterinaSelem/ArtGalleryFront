import {ButtonStyled} from "./styles";
import {ButtonProps} from "./types"


function Button({ name, type = "button", onButtonClick, disabled = false }: ButtonProps) {
  return (
    <ButtonStyled disabled={disabled} type={type} onClick={onButtonClick} selected={false}>
      {name}
    </ButtonStyled>
  );
}

export default Button;

