import React from 'react';
import { PaginationButton, PaginationContainer } from './styles';
import styled from '@emotion/styled';

interface PaginationIndicatorProps {
  progress: number;
}

const PaginationIndicator = styled.div<PaginationIndicatorProps>`
  flex-grow: 1;
  height: 4px;
  background: linear-gradient(to right, black ${props => props.progress}%, lightgray ${props => props.progress}%);
  margin: 0 10px;
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationContainer>
  
      <PaginationIndicator progress={(currentPage / totalPages) * 100} />
      <PaginationButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <img src={currentPage === 1 ? "/assets/LeftInactive.svg" : "/assets/LeftActive.svg"} alt="Previous" />
      </PaginationButton>
      <PaginationButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <img src={currentPage === totalPages ? "/assets/RightInactive.svg" : "/assets/RightActive.svg"} alt="Next" />
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;