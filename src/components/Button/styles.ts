import styled from "@emotion/styled";

interface ButtonComponentProps {
  disabled: boolean;
}

interface ButtonComponentProps {
  selected: boolean;
}

export const ButtonStyled = styled.button<ButtonComponentProps>`
width: 100%;
height: 48px;
outline: none;
border: 1px solid #000;
padding: 20px;
background: ${({disabled}) =>disabled? "#F4F4F4": 'transparent'};
color: #000;
  cursor: pointer;
  &:hover {
background: rgba(217, 217, 217, 0.5);
 }
 display: flex;
  align-items: center;
  justify-content: center;
font-family: Barlow;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;

`;

