var mongoose = require( "mongoose" );
var schema = mongoose.Schema;

var postTemplate = {
	title: { type: String, required: true },
	creationDate: { type: Date, default:Date.now },
	updatedDate: Date,
	author: { type: String, required: true },
	location: String,
	link: String,
	image: String,
	likes: Number
}

var postSchema = new schema( postTemplate );

var PostModel = mongoose.model( "PostModel", postSchema );

module.exports = PostModel;