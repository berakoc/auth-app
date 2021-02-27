import express from 'express'
import UserService from '../services/user'
import { parseError } from '../utils/helper'

const userController = express.Router()

userController.post('/', async (req, res) => {
    try {
        const sessionUser = await UserService.saveUser(req)
        res.send(sessionUser)
    } catch (err) {
        res.status(400).send(parseError(err, {
            onlyMessage: true
        }))
    }
})

export default userController