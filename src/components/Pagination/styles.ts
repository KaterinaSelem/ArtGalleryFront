import styled from '@emotion/styled';


export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`;

export const PaginationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    cursor: not-allowed;
  }
`;


interface PaginationIndicatorProps {
  progress: number;
}

export const PaginationIndicator = styled.div<PaginationIndicatorProps>`
  flex-grow: 1;
  height: 4px;
  background: linear-gradient(to right, black ${props => props.progress}%, lightgray ${props => props.progress}%);
  margin: 0 ;
`;






