const mongoose = require('mongoose');

function Connection() {

	mongoose.connect('mongodb://localhost/machine-test', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
		.then(() => console.log('<==== Connected to mongoDB =====>'))
		.catch(err => console.error('mongoDB not connected'))
}

module.exports = new Connection();
