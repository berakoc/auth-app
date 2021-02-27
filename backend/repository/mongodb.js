import mongoose from "mongoose"
import { MONGO_URI } from "../config"
import User from '../models/User'

export const connection = mongoose.connection

export const connect = async () => {
    await mongoose.connect(MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, () => {
        console.log('Connected to the database')
    })
}

export default {
    async saveUser(username, email, password) {
        const user = new User({
            username, 
            email,
            password
        })
        await user.save()
        return user
    }
}