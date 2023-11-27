// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import GameLayout from 'containers/GameLayout'; // Import the new GameLayout component
import { store } from 'state/store';

import './prototypeOverrides';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <GameLayout /> {/* Use the GameLayout component here */}
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
