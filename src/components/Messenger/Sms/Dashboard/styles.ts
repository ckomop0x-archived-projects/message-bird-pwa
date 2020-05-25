import styled from 'styled-components';

export const DashboardStyled = styled.div`
  border: 1px solid ${({ theme }) => theme.grey5};
  height: 100%;
  min-height: 90vh;
  background-color: #fff;
  padding: ${({ theme }) => theme.grid * 4}px;
  position: relative;
  border-radius: ${({ theme }) => theme.halfGrid * 1.5}px;
`;
