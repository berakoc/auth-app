export const signup = user =>
    fetch('api/v1/user', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

export const login = user =>
    fetch('api/v1/session', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

export const logout = () => fetch('api/v1/session', {
    method: 'DELETE'
})

export const checkLoggedIn = async (preloadedState = {}) => {
    const response = await fetch('api/v1/session')
    const user = await response.json()
    if (user) {
        preloadedState = {
            session: user
        }
    }
    return preloadedState
}