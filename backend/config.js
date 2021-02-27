import {config } from 'dotenv'

config()

export const {
    PORT,
    NODE_ENV,
    MONGO_URI,
    SESS_NAME,
    SESS_SECRET,
    SESS_LIFETIME
} = process.env