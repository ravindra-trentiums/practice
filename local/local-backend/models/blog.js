const mongoose = require('mongoose');

const Blog = mongoose.model('Blog', new mongoose.Schema(
	{
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
        }
	},
	{ timestamps: true, versionKey: false }
));
module.exports = Blog