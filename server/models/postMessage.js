import mongoose from 'mongoose';

//role:String, logs:String

const postSchema = mongoose.Schema({
    name: String,
    creator: String,
    fight: String,
    times: {suns:String, mons:String, tues: String, weds: String, thurs:String, fris:String, sats:String,sune:String, mone:String, tuee: String, wede: String, thure:String, frie:String, sate:String},
    prog: String,
    roles: [[String]],
    comp: [{role: [String], logs: String}],
    ilvl: String,
    exp: String, 
    desc: String,
    createdAt: String
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;