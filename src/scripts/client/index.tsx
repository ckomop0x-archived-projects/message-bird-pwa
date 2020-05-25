import 'firebase/messaging';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';

const Application = () => (
  <Route render={(props: RouteComponentProps) => <App {...props} />} />
);

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  document.getElementById('root')
);
