var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
	title : {
		type: String,
		required:true,
	},
	author: {
		type: String,
		required: true,

	},
	description:{
		type: String,
		required:true,
		maxlength:200
	},
	recommended:{
		type:Number
	}
});

module.exports = mongoose.model('Book', BookSchema);