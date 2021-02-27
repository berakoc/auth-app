// ESM syntax is supported.
import express from 'express'
import {
    connect,
    connection
} from './repository/mongodb'
import connectStore from 'connect-mongo'
import session from 'express-session'
import helmet from 'helmet'
import morgan from 'morgan'
import {
    NODE_ENV,
    PORT,
    SESS_LIFETIME,
    SESS_NAME,
    SESS_SECRET
} from './config'
import {
    is
} from './utils/core'
import RootController from './controllers/root'

const app = express()

;(async () => {
    try {
        await connect()
        const MongoStore = connectStore(session)
        app.use(helmet())
        app.use(morgan('tiny'))
        app.use(express.json())
        app.use(session({
            name: SESS_NAME,
            secret: SESS_SECRET,
            resave: false,
            saveUninitialized: false,
            store: new MongoStore({
                clientPromise: connection,
                collection: 'session',
                ttl: parseInt(SESS_LIFETIME) / 1000
            }),
            cookie: {
                sameSite: true,
                secure: is(NODE_ENV, 'production'),
                maxAge: parseInt(SESS_LIFETIME)
            }
        }))
        app.use('/api/v1', RootController)
        const listener = app.listen(PORT, () => {
            console.log('Listening on port '.concat(listener.address().port))
        })
    } catch (err) {
        console.log(err)
    }
})()