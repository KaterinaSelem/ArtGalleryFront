import styled from '@emotion/styled';

export const EditComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 600px;
  height: fit-content;
  align-self: center;
`;

export const EditLabel = styled.label`
display: flex;
flex-direction: column;
gap: 16px;
color: #514F4F;
font-family: Barlow;
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: 28px;
margin-bottom: 12px;
margin-top: 24px;
width: 100%;
`;


export const ErrorMessage = styled.p`
color: #B46668;
font-family: Barlow;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 16px;
`;

export const EditWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 16px;
  margin-left: 30px;`;

  export const LoadPhoto = styled.div`
  margin-bottom: 28px;
`;

export const StyledButton = styled.button`
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

export const UploadWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 92px;
  margin-left: 30px;
  gap: 4px;
  width: 600px;
  height: fit-content;
  align-self: center;
`;

export const UploadButtonsWrap = styled.div`
display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 16px;
  margin-bottom: 24px;
`;

export const UploadInfosWrap = styled.div`

display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 16px;

`;


export const SaveButtonsWrap = styled.div`
display: flex;
margin-top: 24px;`;


