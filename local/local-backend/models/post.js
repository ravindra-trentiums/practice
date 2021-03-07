const mongoose = require('mongoose');

const Post = mongoose.model('Post', new mongoose.Schema(
	{
        title: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255,
            trim: true
        },
        body: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 6500,
            trim: true
        }
	},
	{ timestamps: true, versionKey: false }
));
module.exports = Post