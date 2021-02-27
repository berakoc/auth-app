import express from 'express'
import { parseError } from '../utils/helper'
import SessionService from '../services/session'

const sessionController = express.Router()

sessionController.post('/', async (req, res) => {
    try {
        const sessionUser = await SessionService.save(req)
        res.send(sessionUser)
    } catch (err) {
        res.status(400).send(parseError(err, {
            onlyMessage: true
        }))
    }
})

sessionController.delete('/', ({ session }, res) => {
    try {
        SessionService.delete(session, res)
    } catch (err) {
        res.status(422).send(parseError(err, {
            onlyMessage: true
        }))
    }
})

sessionController.get('/', async ({ session: { user }}, res) => {
    const sessionUser = SessionService.get(user)
    res.send(sessionUser)
})

export default sessionController