import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;`

export const LoginFormComponent = styled.form`
display: flex;
  flex-direction: column;
  gap: 30px;
  width: 590px;
  height: fit-content;
  padding: 20px;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

export const LoginName  = styled.p`
  color: #000;
text-align: center;
font-family: Barlow;
font-size: 36px;
font-style: normal;
font-weight: 400;
line-height: normal;
  `

export const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

export const StyledLinkLikeBtn = styled(Link)`
    text-decoration: none;
    color: #000;
      cursor: pointer;
      &:hover {
    background: rgba(217, 217, 217, 0.5);
     }
`;
export const StyledHeader = styled.p`
color: #000;
text-align: center;
font-family: Barlow;
font-size: 28px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
