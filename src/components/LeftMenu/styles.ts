import styled from 'styled-components';

export const LeftMenuStyled = styled.div`
  background: ${({ theme }) => theme.grey10};
  width: ${({ theme }) => theme.grid * 10}px;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.a`
  text-decoration: none;
  line-height: ${({ theme }) => theme.grid * 4}px;
  vertical-align: top;
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.grid * 5}px;
  padding: ${({ theme }) => theme.grid * 3}px ${({ theme }) => theme.grid * 2}px
    ${({ theme }) => theme.grid * 2}px;
  text-align: center;

  img {
    width: ${({ theme }) => theme.grid * 4}px;
    line-height: ${({ theme }) => theme.grid * 4}px;
    vertical-align: top;
    display: inline-block;
  }
`;

export const LeftMenuIcon = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.grid}px;
`;

export const LogOutButton = styled.button`
  background: none;
  color: ${({ theme }) => theme.white};
  text-align: center;
  white-space: nowrap;
  border: 0;
  cursor: pointer;

  img {
    width: ${({ theme }) => theme.grid * 3}px;
  }
`;
