import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import configureStore from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'
import { checkLoggedIn } from './utils/session'

const renderApp = preloadedState => {
    console.log({preloadedState})
    const store = configureStore(preloadedState)
    window.getState = store.getState
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    )
}

(async () => renderApp(await checkLoggedIn()))()