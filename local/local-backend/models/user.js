const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema(
	{
		name: {
			type: String,
			minlength: 3,
			maxlength: 50
		},
		email: {
			type: String,
			minlength: 3,
			maxlength: 200,
			unique: true
		},
		gender: {
			type: String,
			minlength: 3,
			maxlength: 50
		},
		password: {
			type: String,
			minlength: 3,
			maxlength: 1024
		},
	},
	{ timestamps: true, versionKey: false }
));
module.exports = User