// import { GlobalStyle, NormalizeStyles, themeStyles } from '@client/styles';
import { ThemeProvider } from 'styled-components';
// import * as socketIOClient from 'socket.io-client';
// import FirebaseMessaging from '../src/scripts/client/components/FirebaseMessaging';
import Login from '../src/components/Login';

const MainPage = () => {
  const onKeyChange = (key: string) => {
    return key;
  };

  return (
    <MainApp id="main-app">
      <Login onKeyChange={onKeyChange} />
    </MainApp>
  );
};

export default MainPage;

import styled from 'styled-components';

export const MainApp = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
  overflow: hidden;
  position: relative;
`;
