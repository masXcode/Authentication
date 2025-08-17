import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    name:{type: String, required: true},
    age:{type: Number},
    imageLink:{type: String,default:""},
    
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true, minlength: 6},
    
    aboutUser:{type: String, default:""},
    isAdmin:{type: Boolean, default: false},

    token: { type: [String], default:[] },

    lastLogsIn: { type: [String], default:[] },
    
}, {timestamps:true})

userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const Users = mongoose.model('Users', userSchema)

export default Users