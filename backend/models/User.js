import { compareSync, hashSync } from "bcryptjs";
import {
    model,
    Schema
} from "mongoose";
import { passwordErrorMessage, passwordRegex } from "../validations/user";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: username => User.doesNotExist({
                username
            }),
            message: 'Username already exists.'
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: email => User.doesNotExist({
                email
            }),
            message: 'Email already exists.'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: password => passwordRegex.test(password),
            message: passwordErrorMessage
        }
    },
}, {
    timestamps: true
})

UserSchema.pre('save', function() {
    if (this.isModified('password')) {
        this.password = hashSync(this.password, 10)
    }
})

UserSchema.static('doesNotExist', async function(field) {
    return await this.where(field).countDocuments() === 0
})

UserSchema.method('comparePasswords', function(password) {
    return compareSync(password, this.password)
})

const User = model('users', UserSchema)

export default User