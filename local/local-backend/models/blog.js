const mongoose = require('mongoose');

const Blog = mongoose.model('Blog', new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        tittle: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255,
            trim: true
        },
        description: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 6500,
            trim: true
        },
        blogImage: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255,
            trim: true
        },
        isHome: {
            type: Boolean, required: true, default: false
        }
    },
    { timestamps: true }
));
module.exports = Blog