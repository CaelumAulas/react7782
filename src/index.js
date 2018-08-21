import React from 'react';
import ReactDOM from 'react-dom';

// CSS Global
import './assets/css/reset.css'
import './assets/css/container.css'
import './assets/css/btn.css'
import './assets/css/icon.css'
import './assets/css/iconHeart.css'
import './assets/css/notificacao.css'

import './assets/css/novoTweet.css'

import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';

import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
