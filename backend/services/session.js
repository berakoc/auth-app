import { SESS_NAME } from "../config"
import User from "../models/User"
import { sessionizeUser } from "../utils/helper"
import { signIn } from "../validations/user"

export default {
    async save(req) {
        const { email, password } = req.body
        await signIn.validateAsync({
            email,
            password
        })
        const user = await User.findOne({ email })
        if (user && user.comparePasswords(password)) {
            const sessionUser = sessionizeUser(user)
            req.session.user = sessionUser
            return sessionUser
        }
        throw new Error('Invalid login credentials')
    },
    delete(session, res) {
        const user = session.user
        if (user) {
            session.destroy(err => {
                if (err) throw err
                res.clearCookie(SESS_NAME)
                res.send(user)
            })
        } else {
            throw new Error('There is no active session.')
        }
    },
    get(user) {
        return user || { user }
    }
}