// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends.js");

function compare(friends, postArr) {
  var matchingCountTop = 0;
  var topName = "holding";
  
  // loop through friends Arry.  
  for (var j = 0; j < friends.length; j++) {
    // get the array from the object
    var tempArr = friends[j].scores;
    // take that array and loop through it.
    var matchingCount = 0;
    
    
    for (var i = 0; i < tempArr.length; i++) {
      // look at the targeted array and increase for each matching element between it and the posted array
      if (tempArr[i] == postArr.scores[i]) {
        matchingCount++;
      }
              
      }
      if (matchingCount >= matchingCountTop) {
        matchingCountTop = matchingCount; 
        topName = friends[j].name;
      
    }
    
  }
  return topName;
  
} 


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

  app.get("/friends", function (req, res) {
    res.json(friends);
  });

  // Create New Characters - takes in JSON input
  app.post("/api/friends", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
   
    //console.log(compare(friends, req.body));
    res.json(compare(friends, req.body));
    friends.push(req.body);
  });
};
