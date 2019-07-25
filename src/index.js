import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { AppContainer } from 'react-hot-loader';

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