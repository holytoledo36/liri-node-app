// //Link to keys.js
// //process.rv
// //look into using switch
// //twitter require
// //require spotify
// //require fs 


// //make code so shows last 20 tweets and when created
// //This will show the following information about the song in your terminal/bash window
// // Artist(s)
// // The song's name
// // A preview link of the song from Spotify
// // The album that the song is from
// // If no song is provided then your program will default to "I have been found" 


var keys = require ("./keys.js");

var Twitter = require ("twitter");

var fs = require ("fs");

var userRequest = process.argv[2];

var userInput = process.argv[3];

var Spotify = require("node-spotify-api");

var request = require ('request');


function twittyTwenty(tweet) {
	var client = new Twitter(keys.twitterKeys);
	var params = {
		screen_name: 'D_Copperfield',
		count: 20
	};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error && response.statusCode === 200) {
			for (var i = 0; i < tweets.length; i++) {
				console.log('----------------');
				console.log('');
				console.log(tweets[i].text);
			} 
		} 

	})
	fs.appendFile("log.txt", "\n" + params.screen_name, function(err) {
		if (err) {
  			return console.log(err);
    	}
  	});
}

function spotifyPlay(songName) {

	var spotify = new Spotify({
		id: "863455d15a1f48568b17e5c824abc58a",
		secret: "e65504051b69438c87aa284518947768"
	}); 


	if (songName === undefined) {
 		songName = "I have been found";
 		
 	} 
 	
 	console.log(songName);
 	
	spotify.search({ type: 'track', query: songName, limit: 3 }, 
		function(err, data) {
				
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;  
	    } else {
		    var songInfo = data.tracks.items;

		    fs.appendFile("log.txt", "\n" + songName, function(err) {
	    		if (err) {
	      			return console.log(err);
		    	}
		  	});
		    
		    for (var i = 0; i < songInfo.length; i++) {
		    	for (var j = 0; j < songInfo[i].artists.length; j++) {
		    		console.log("");
		    		console.log("artist: ", JSON.stringify(songInfo[i].artists[j].name, null, 2));
			    	console.log("")
			    	console.log("------------------------------")
		    	}
		    	
		    	
		    	console.log("song: ", JSON.stringify(songInfo[i].name, null, 2));
		    	console.log("")
		    	console.log("------------------------------")
		    	console.log("album: ", JSON.stringify(songInfo[i].album.name, null, 2));
		    	console.log("")
		    	console.log("------------------------------")
		    	console.log("preview: ", JSON.stringify(songInfo[i].preview_url, null, 2));
		    	console.log("")
		    }
	    } 
	    
  	});

};

function movieInfo(movieName) {


	if (movieName === undefined) {
		movieName = "Star Wars";
	} else {
		movieName = process.argv.slice(3).join(" ");
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log('');
			console.log(JSON.parse(body).Title);
			console.log('');
			console.log('----------------');
			console.log(JSON.parse(body).Year);
			console.log('');
			console.log('----------------');
			console.log(JSON.parse(body).imdbRating);
			console.log('');
			console.log('----------------');
			console.log(JSON.parse(body).Ratings[1].Value);
			console.log('');
			console.log('----------------');
			console.log(JSON.parse(body).Country);
			console.log('');
			console.log('----------------');
			console.log(JSON.parse(body).Language);
			console.log('');
			console.log('----------------');
			console.log(JSON.parse(body).Plot);
			console.log('');
			console.log('----------------');
			console.log(JSON.parse(body).Actors);
			console.log('');
			console.log('----------------');
		} else if (error) {
			console.log(error);
		}

		fs.appendFile("log.txt", "\n" + movieName, function(err) {
    		if (err) {
      			return console.log(err);
	    	}
	  	});
	});
}

function doinIt() {
	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {
			return console.log(error);
		}

		var dataArr = data.split(",");

		
		console.log("command: ", dataArr[0]);
		
		var command = dataArr[0];
		var value = dataArr[1];
		
		switch (command) {
			case "spotify-this-song":
				spotifyPlay(value);
				break;
			case "movie-this":
				movieInfo(value);
				break;
			case "my-tweets":
				twittyTwenty(value);
				break;
		};

	});
};
 
switch (userRequest) {

	case "my-tweets":
		twittyTwenty(userInput);
		break;

	case "spotify-this-song":
		spotifyPlay(userInput);
		break;

	case "movie-this":
		movieInfo(userInput);
		break;

	case "do-what-it-says":
		doinIt(userInput);
		break;

	default:
		console.log('');
		console.log("Please choose from your options: 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'");
		console.log('');
}

