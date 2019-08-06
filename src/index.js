import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';
const doRender = App => render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById('react-root'),
);

doRender(App);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => {
        doRender(App);
    });
}