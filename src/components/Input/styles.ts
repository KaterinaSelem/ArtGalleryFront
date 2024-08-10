import styled from '@emotion/styled';

export const InputComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: fit-content;
`;

export const InputLabel = styled.label`
color: #514F4F;
font-family: Barlow;
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: 28px;
margin-bottom: 12px;
`;

export const InputComponent = styled.input`
  width: 100%;
  height: 44px;
  outline: none;
  border: 1px solid #514F4F;
  background-color: #F4F4F4;
  font-size: 16px;
  &::placeholder {
    color: #6f6f6f;
  }
  padding: 10PX;
`;
export const ErrorMessage = styled.p`
color: #B46668;
font-family: Barlow;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 16px;
`;


