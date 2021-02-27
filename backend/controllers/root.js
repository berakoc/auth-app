import express from 'express'
import sessionController from './session'
import userController from './user'

const RootController = express.Router()
RootController.use('/user', userController)
RootController.use('/session', sessionController)

export default RootController