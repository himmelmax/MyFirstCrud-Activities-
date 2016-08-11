var express = require( "express" );
var app = express( );
var bodyParser = require( "body-parser" );
var cors = require( "cors" );
var morgan = require( "morgan" );
var mongoose = require( "mongoose" );

mongoose.connect( "localhost/activities" );

var PostModel = require( "./Models/Post_Model.js" );

app.use( cors() );
app.use( bodyParser.json() );
app.use( morgan("dev") );

app.get( "/", function( request, response ) {
	response.json( "Hello world." );
} );

app.get( "/posts", function( request, response ) {
	PostModel.find( {}, function(err, posts) {
		if ( err ) {
			response.status( 500 ).json( err );
		}
		else {
			response.json( posts );
		}
	} );
} );

app.post( "/posts", function( request, response ) {
	var newPost = request.body;

	console.log( newPost );

	PostModel.create( newPost, function(err, post) {
		if ( err ) {
			response.status( 500 ).json( err );
		}
		else {
			response.json( post );
		}
	} );
} );

app.delete( "/posts", function( request, response ) {
	var delPost = request.body;

	PostModel.find( delPost, function(err, posts) {
		if ( err ) {
			response.status( 500 ).json( err );
		}
		else if ( posts.length == 0 ) {
			response.json( "Warning: No post found." );
		}
		else {
			posts[0].remove( function(err, success) {
				if ( err ) {
					response.status( 500 ).json( err );
				}
				else {
					response.json( success );
				}
			} );
		}
	} );
} );

app.put( "/posts", function( req, res ) {
	PostModel.findById( req.body.id, function(err, post) {
		if ( err ) {
			res.status( 500 ).json( err );
		}
		else {
			if ( post !== null ) {
				post.update( req.body.update, function(err, success) {
					if ( err ) {
						res.status( 500 ).json( err );
					}
					else {
						res.json( success );
					}
				} );
			}
			else {
				res.json( "Error: No update sent. Update required." );
			}
		}
	} );
} );

app.listen( 3000, function() {
	console.log( "Server running on port 3000" );
} );