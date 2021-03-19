const mongoose = require('mongoose');

const Comment = mongoose.model('Comment', new mongoose.Schema(
    {
        blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
        comment: {
            type: String,
            required: true,
            minlength: 3,
            trim: true
        }
    },
    { timestamps: true }
));
module.exports = Comment