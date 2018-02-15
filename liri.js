
var keys = require ("./keys.js");

var Twitter = require ("twitter");//mpm package for twitter

var fs = require ("fs");

var userRequest = process.argv[2];

var userInput = process.argv[3];

var Spotify = require("node-spotify-api");

var request = require ('request');

//var dataArr = [];
var spotify = new Spotify ({
	id: "863455d15a1f48568b17e5c824abc58a",
	secret: "e65504051b69438c87aa284518947768"
})

var twitterFunc = function () {
//	var twitter = new Twitter ({
// 		consumer_key: keys.twitterKeys.consumer_key,
// 	  	consumer_secret: keys.twitterKeys.consumer_secret,
// 	  	access_token_key: keys.twitterKeys.access_token_key,
// 	  	access_token_secret: keys.twitterKeys.access_token_secret
// });
	var client = new Twitter (keys.twitterKeys);




	var params = {
		screen_name: 'jesus',
		count: 20
	};

		client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	if (!error && response.statusCode === 200) {
	  		for (var i=0; i<tweets.length; i++) {
	    		console.log(tweets[i].text);
	    		console.log('-----------------');
//	    		dataArr.push(tweets[i].text);

	    		}	
	  	
	  	}

	  		//appendFunc();
	  	});
}





var spotifyFunc = function() {
	spotifySong = userInput;
	// if user doesn't input a song, default to The Sign 
	if (spotifySong === undefined) {
		spotifySong = 'The Sign';
	}
	
		spotify.search ({ 
		type: 'track', 
		query: spotifySong
	}, function(error, data) {
		if (error) {
	    	return console.log('Error occurred: ' + error);
		}
		else {
			for (var i=0; i<data.tracks.items.length; i++) {
				// artist
				console.log(data.tracks.items[i].artists[0].name);
				// name
				console.log(data.tracks.items[i].name);
				// preview link to song, there are many times that it returns null so I used an if func for that
				if (data.tracks.items[i].preview_url === null) {
					console.log("There is no preview url for this song unfortunately");
				}
				else {	
					console.log(data.tracks.items[i].preview_url);
				}	
				// album song is from 
				console.log(data.tracks.items[i].album.name);
				// divider
				console.log('---------------------');
				dataArr.push(
					data.tracks.items[i].artists[0].name, 
					data.tracks.items[i].name,
					data.tracks.items[i].preview_url,
					data.tracks.items[i].album.name
				);
			}
			
		}	
	});
}

switch (userRequest){
	case "my-tweets":
		twitterFunc (userInput);
		break;

	case "spotify-this-song":
		spotifyFunc (userInput);
		break;

	default:
		console.log("chose correct option");
}







//Link to keys.js
//process.rv
//look into using switch
//twitter require
//require spotify
//require fs 


//make code so shows last 20 tweets and when created
//This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base

//Look up request

//random text for do as it says, it's a read file

