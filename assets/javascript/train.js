/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new train - then update the html + update the database
// 3. Create a way to retrieve train info from the train schedule database.
// 4. Create a way to calculate the next arrival and the minutes away. Using difference between start and current time.
//  5. Then use moment.js formatting to set difference in minutes.


// 1. Initialize Firebase
var config = {
  
    apiKey: "AIzaSyCBUpVYPGxCZfp4QOiilExSpzQDifBbaww",
    authDomain: "trainschedule-52f4f.firebaseapp.com",
    databaseURL: "https://trainschedule-52f4f.firebaseio.com",
    projectId: "trainschedule-52f4f",
    storageBucket: "trainschedule-52f4f.appspot.com",
    messagingSenderId: "338546968490"
  };

  firebase.initializeApp(config);



var database = firebase.database();

// 2. Button for adding train info
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: destination,
    first: firstTrain,
    freq: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#freqeuncy-input").val("");
});

// 3. Create Firebase event for adding train info to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  // Prettify the train start
  var firstTrainPretty = moment.unix(firstTrain).format("HH:mm");
console.log(firstTrainPretty);
  // Calculate the next arrival time based on first and frequency
  // moment.duration().minutes();
  //var nextArrival = current time (first train  )
  now = moment().format("HH:mm");
  console.log("now " + now);
  b = moment(firstTrainPretty).diff(moment().format("HH:mm"));
  console.log("b " + b);
  
  d = moment().subtract(firstTrainPretty).format("HH:mm");
  e = moment.d/frequency
  f = e/60
  nextArrival = moment().add(d).format("HH:mm");
  //var duration = moment.duration({'days' : 1});

  console.log("d "+ d);
  console.log("e " + e);
  console.log("f "+ f);
  console.log(nextArrival);
  // or (((now-firstTrain)/frequency)/60) + now
  //var nextArrival = moment().?
 // console.log(nextArrival);

  // Calculate the minutes until next train
  var minutesAway = moment().diff(nextArrival. c);
 // console.log(minutesAway);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  firstTrainPretty + "</td><td>" + frequency +  "</td></tr>");

});

//"</td><td>" + nextArrival + "</td><td>" + minutesAway +
