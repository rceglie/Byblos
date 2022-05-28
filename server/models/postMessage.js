import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    creator: String,
    fight: String,
    times: String,
    prog: String,
    roles: String,
    comp: String,
    ilvl: String,
    logs: String,
    exp: String, 
    desc: String
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;