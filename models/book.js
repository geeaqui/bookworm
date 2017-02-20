var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
	title : {
		type: String,
		required:true,
		min:5
	},
	author: {
		type: String,
		required: true

	},
	description:{
		type: String,
		required:true,
		maxlength:1000
	},
	recommended:{
		type:Number
	},
	imgurl:{
		type:String
	}
});

module.exports = mongoose.model('Book', BookSchema);