var listFriends = require("../data/friends"); //this is "required" to pull the listfriends JSON data
// from friends.js
module.exports = function (app) {

    app.get("/api/friends", function (req, res) { //survey.html posted data to api/friends
        res.json(listFriends); // grabs JSON objects from friends.js
    });

    app.post("/api/friends", function (req, res) { 
        var match = {
            name: "",
            photo: "",
            scoreDifference: 1000
        };
        var newFriend = req.body;
    

        for (var i = 0; i < listFriends.length; i++) {
             totalDiff = 0;

            for (var j = 0; j < listFriends[i].scores.length; j++) {
                //Math.abs returns the absolute value
                totalDiff += Math.abs(parseInt(listFriends[i].scores[j] - parseInt(newFriend.scores[j])));
            }
            if (totalDiff <= match.scoreDifference) {
                match.name = listFriends[i].name;
                match.photo = listFriends[i].photo;
                match.scoreDifference = totalDiff;
            }


        }

        listFriends.push(newFriend);
        res.json(match);
        console.log("Your BFF is " + match.name +'. Your "Compatability Difference" is ' + match.scoreDifference);

    });

};