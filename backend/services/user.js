import { signUp } from "../validations/user"
import MongoDBRepo from '../repository/mongodb'
import { sessionizeUser } from "../utils/helper"

export default {
    async saveUser(req) {
        const { username, email, password } = req.body
        await signUp.validateAsync({
            username,
            email,
            password
        })
        const user = await MongoDBRepo.saveUser(username, email, password)
        const sessionizedUser = sessionizeUser(user)
        req.session.user = sessionizedUser
        return sessionizedUser
    }
}