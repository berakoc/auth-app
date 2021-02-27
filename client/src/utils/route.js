import React from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = ({ session: { userId }}) => ({
    loggedIn: Boolean(userId)
})

const Auth = ({ loggedIn, path, component: Component }) => (
    <Route path={path} render={props => (
        loggedIn ? <Redirect to='/dashboard' /> : <Component { ...props } />
    )} />
)

const Protected = ({ loggedIn, path, component: Component }) => (
    <Route path={path} render={props => (
        loggedIn ? <Component { ...props } /> : <Redirect to='/login' />
    )} />
)

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth))
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected))