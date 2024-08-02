import {ButtonStyled} from "./styles";
import {ButtonProps} from "./types"


function Button({ name, type = "button", onButtonClick, disabled = false }: ButtonProps) {
  return (
    <ButtonStyled disabled = {disabled} type={type} onClick={onButtonClick}>
      {name}
    </ButtonStyled>
  );
}

export default Button;

// import "./styles.css";

// function Button({ buttonName = "Get data", isPrimaryButton }) {
//   // 1 вариант
//   // const buttonClass = isPrimaryButton
//   //   ? "main-button primary-button"
//   //   : "main-button secondary-button";
//   console.log(isPrimaryButton);
//   // 2 вариант
//   const buttonClass = `main-button ${
//     isPrimaryButton ? "primary-button" : "secondary-button"
//   }`;

//   return <button className={buttonClass}>{buttonName}</button>;
// }

// export default Button;
