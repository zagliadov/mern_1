import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        require: true,
    },
});

export const Post = mongoose.model('Post', postSchema);
