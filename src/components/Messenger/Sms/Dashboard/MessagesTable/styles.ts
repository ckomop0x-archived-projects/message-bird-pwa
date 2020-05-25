import styled from 'styled-components';

export const MessagesTableStyled = styled.div`
  overflow-x: scroll;

  table {
    margin-bottom: 30px;
    font-size: 14px;
    width: 100%;
    max-width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    background-color: transparent;

    thead {
      border-bottom: 1px dashed ${({ theme }) => theme.grey7};
      font-family: 'Lota', sans-serif;

      th {
        white-space: nowrap;
        vertical-align: top;
        border-bottom: 0;
        font-weight: 600;
        padding: 10px 10px 5px;
        word-break: break-all;
        line-height: 1.42857143;
        border-top: 1px solid #ddd;
        text-align: left;
      }
    }

    tbody {
      td {
        word-break: keep-all;
        white-space: pre-line;
        border-right: 2px solid ${({ theme }) => theme.grey6};
        border-top: 0;
        border-bottom: 2px solid ${({ theme }) => theme.grey6};
        vertical-align: middle;
        line-height: 1.42857143;
        padding: ${({ theme }) => theme.grid}px ${({ theme }) => theme.grid}px
          ${({ theme }) => theme.halfGrid}px;

        &:last-child {
          border-right: 0;
        }
      }
    }
  }
`;
