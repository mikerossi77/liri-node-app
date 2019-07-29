require("dotenv").config();
var keys = require("./keys.js");

myCommand = process.argv[2];

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: 'eabb836e32cc4bcd9501743c4e9087dd',
    secret: '718680e91bec4b53869c1158574a281d'
});

// var spotify = new Spotify({
//     id: SPOTIFY_ID,
//     secret: SPOTIFY_SECRET
//   });

var allArgs = process.argv;


var spotifyThis = function (term) {
    if (!term) {
        var term = "The Sign";
    }

    if (process.argv[3]) {
        term = "";
        for (i = 3; i < allArgs.length; i++) {
            term = term + allArgs[i] + " ";
        }
    }

    spotify
        .search({ type: 'track', query: term })
        .then(function (response) {
            //console.log(response.tracks.items[1]);
            var songInfo = response.tracks.items[1];
            for (i = 0; i < songInfo.artists.length; i++) {
                console.log("\nArtist: " + songInfo.artists[i].name);
                console.log("\nSong Name: " + songInfo.name);
                console.log("\nPreview Song: " + songInfo.preview_url);
            }

        })
        .catch(function (err) {
            console.log(err);
        });
}

var movieThis = function (term) {
    // Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
    var axios = require("axios");
    if (!term) {
        var term = "Mr. Nobody.";
    }
    if (process.argv[3]) {
        term = "";
        for (i = 3; i < allArgs.length; i++) {
            term = term + allArgs[i] + " ";
        }
    }
    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("\nThe movie's title is: " + response.data.Title);
            console.log("\nThe movie's came out in: " + response.data.Year);
            console.log("\nThe movie's IMDB rating is: " + response.data.imdbRating);
            console.log("\nThe movie's Rotten Tomatoes rating is: " + response.data.Ratings[1].Value);
            console.log("\nThe movie's country is: " + response.data.Country);
            console.log("\nThe movie's language is: " + response.data.Language);
            console.log("\nThe movie's plot is: " + response.data.Plot);
            console.log("\nThe movie's actors are: " + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

if (myCommand === 'do-what-it-says') {
    var fs = require('fs');
    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        //console.log(data)
        var splitData = data.split(',');
        for (var i = 0; i < splitData.length; i++) {
            console.log(splitData[i]);
        }
        myCommand = splitData[0];
        //console.log("The command is " + myCommand);
        term = splitData[1];
        if (myCommand === 'spotify-this-song') {
            spotifyThis(term);
        }
        else if (myCommand === 'movie-this') {
            movieThis(term);
        }
    });
}
var term = process.argv[3];
if (myCommand === 'spotify-this-song') {
    spotifyThis(term);
}
else if (myCommand === 'movie-this') {
    movieThis(term);
}






