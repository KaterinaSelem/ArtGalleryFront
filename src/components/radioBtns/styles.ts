import styled from '@emotion/styled';

export const WrapRBtn = styled.div`
display: flex;
width: 100%;
height: 48px;
flex-direction: row;
margin-bottom: 40px;
gap: 20px;
`;

export const RadioInput = styled.input`
  display: none;
`;

export const RadioLabel = styled.label<{ checked: boolean }>`
  flex-grow: 1;
  width: 100%;
  padding: 10px;
  border: 1px solid #000;
  background: ${({ checked }) => (checked ? '#EAEAEA' : 'transparent')};
  color: ${({ checked }) => (checked ? '514F4F' : '#000')};
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background: rgba(217, 217, 217, 0.5);
  }

  display: flex;
  align-items: center;
  justify-content: center;
  width: 258px;
  margin-bottom: 25px;
  font-family: Barlow;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const RadioCheckedLabel = styled(RadioLabel)`
  background-color: #007bff;
  color: #fff;
  border: none;

  &:hover {
    background-color: #0056b3;
  }
`;


