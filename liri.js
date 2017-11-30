var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var request = require("request");
var client = require("./keys.js");
var T = new Twitter(client);

var args = process.argv;
var input = args.slice(3, args.length);

if (process.argv[2] === "movie-this") {
	
	// if (input = undefined) {
	// 	var input = "Mr. Nobody";
	// }

	request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
		if (error) {
			return console.log("err");
		} else if (!error && response.statusCode === 200) {
			var yay = JSON.parse(body);
			console.log("Title: " + yay.Title);
			console.log("Year Released: " + yay.Year);
			console.log("IMDB Rating: " + yay.imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.stringify(yay.Ratings[1]));
			console.log("Country where movie was produced: " + yay.Country);
			console.log("Language: " + yay.Language);
			console.log("Plot: " + yay.Plot);
			console.log("Actors: " + yay.Actors);
			// console.log(yay);
		}
	});
};

if (process.argv[2] === "spotify-this-song") { 
	// Artist(s)
	// The song's name
	// A preview link of the song from Spotify
	// The album that the song is from

	var spotify = new Spotify({
		id: "5ba9210f4b554562a4432d4d24998491",
		secret: "b568ccb28a0d464b9f357e7f8a410878"
	});

	// if (input = undefined) {
	// 	var input = "The Sign Ace of Base";
	// }

	spotify.search({
		type: "track",
		query: input,
	},

		function(err, data) {
	  	if (err) {
	    	return console.log("Error occurred: " + err);
	  	}
		var artist = data.tracks.items[0].artists[0].name;
		var title = data.tracks.items[0].name;
		var preview = data.tracks.items[0].preview_url;
		var album = data.tracks.items[0].album.name;

		console.log("Artist: " + artist);
		console.log("Title: " + title);
		console.log("Preview: " + preview);
		console.log("Album: " + album);
	});

	// var removeSpaces = input.replace(" ", "+");

		// .get("https://api.spotify.com/v1/search", function(data, err) {}
		// .search({ type: "track", query: "The Sign" })
	// spotify.request("https://api.spotify.com/v1/search?q=" + input + "&type=track&limit=1")
	// 	.then(function(data) {
	//     	console.log(JSON.stringify(data));
	//     	// console.log(JSON.stringify(data.tracks.items.artists.name));
	//   	})
	//   	.catch(function(err) {
	//     	console.error('Error occurred: ' + err); 
	//   	});
};

// search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);


if (process.argv[2] === "my-tweets") {
	var params = {screen_name: 'not_jimmycones', count: 20};

	// T.get("https://api.twitter.com/1.7.1/statuses/user_timeline.json?user_id=not_jimmycones&count=20", params, function(error, tweets, response) {
	T.get("statuses/user_timeline", params, function(error, tweets, response) {
		if (error) {
			console.log(error);
		} else if (!error && response.statusCode === 200) {
    		for (i = 0; i < 20; i++) {
    			if (tweets[i] != undefined) {
    				var text = tweets[i].text;
    				var time = tweets[i].created_at;
    				console.log(text + "\n\tCreated at: " + time);
    			}
    		}
  		}
	})
}

