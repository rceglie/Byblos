import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    creator: String,
    fight: String,
    times: [String],
    prog: String,
    roles: [[String]],
    ilvl: String,
    exp: String,
    sum: String,
    desc: String,
    createdAt: String
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;