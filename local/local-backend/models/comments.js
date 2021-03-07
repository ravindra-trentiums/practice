const mongoose = require('mongoose');

const Comment = mongoose.model('Comment', new mongoose.Schema(
	{
        post_id: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255,
            trim: true
        },
        comment: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255,
            trim: true
        }
	},
	{ timestamps: true, versionKey: false }
));
module.exports = Comment