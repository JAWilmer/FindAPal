var friends = require("../data/friends");

module.exports = function(app) {
  // Return all friends found in friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log("New Pal Score: ", req.body.scores);

    // Receive user details (name, photo, about, scores)
    var user = req.body;

    // parseInt for scores
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // Default friend match is the first friend. New user is matched to friends.js friend with minimum difference in score
    var bffIndex = 0;
    var minDiff = 40;

    // Begin with zero difference, compare the user and the ith friend scores one set at a time.  Add this difference to the total difference
    for(var i = 0; i < friends.length; i++) {
      var totalDiff = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        var diff = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDiff += diff;
      }

      // If user input results in a friend with a new minimum, change the bff index and set the new minimum for future comparisons
      if(totalDiff < minDiff) {
        bffIndex = i;
        minDiff = totalDiff;
      }
    }

    // Add user to friend array
    friends.push(user);

    // Send BFF match to browser
    res.json(friends[bffIndex]);
  });
};