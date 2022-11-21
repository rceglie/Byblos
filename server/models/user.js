import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: String},
    verified: {type: Boolean, default: false},
    active: {type: Boolean, default: false},
    info: {
        fight:String,
        times:[String],
        prog:String,
        roles:[String],
        ilvl:String,
        exp:String,
        desc:String
    },
    discord: {type: String}
})

export default mongoose.model("User", userSchema)