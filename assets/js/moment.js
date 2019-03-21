  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBHeZ4uokA3rhVHu60I_2TRrGLkJU4dwSE",
    authDomain: "traintimer-fac1f.firebaseapp.com",
    databaseURL: "https://traintimer-fac1f.firebaseio.com",
    projectId: "traintimer-fac1f",
    storageBucket: "traintimer-fac1f.appspot.com",
    messagingSenderId: "148982448657"
  };
  firebase.initializeApp(config);



// Variables reference from Firebase
var database = firebase.database();

// 2. Button for adding Trains
$("#add-trainTimer-btn").on("click", function (event) {
  console.log("click");
  event.preventDefault();

  // Grabs user input
  var name = $("#name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTime = $("#first-time").val().trim();

  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

  var expTime = moment($("#first-time").val().trim(), "HH:mm").format("X");

  console.log("moment()" , moment());
  console.log("firstTime: ", firstTime);
  console.log("moment(firstTime, 'HH:mm') : ", moment(firstTime, 'HH:mm'));
  console.log("firstTimeConverted: ", firstTimeConverted);
  console.log("expTime: ", expTime);

  var frequency = $("#frequency").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: name,
    destination: destination,
    firstTime: firstTime,

    //firstTimeConverted: firstTimeConverted,
    frequency: frequency
  };

  console.log("newTrain: ", newTrain);

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log("-name: ", newTrain.name);
  console.log("-destination: ", newTrain.destination);
  console.log("-firstTime: ", newTrain.firstTime);
  console.log("-frequency: ", newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#name").val("");
  $("#destination").val("");
  $("#first-time").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
console.log(childSnapshot.val());

  // Store everything into a variable.
  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().firstTime;
  var frequency = childSnapshot.val().frequency;

  // Train Info
  console.log("name: ", name);  
  console.log("destination: ", destination);
  console.log("firstTime: ", firstTime);
  console.log("frequency: ", frequency);

  // First Time 
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  console.log("firstTimeConverted", firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var remainder = diffTime % frequency;
  console.log("REMAINING TIME: ", remainder);

  // Minute Until Train
  var minutesTillTrain = frequency - remainder;
  console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

  // Next Train
  var nextTrain = moment().add(minutesTillTrain, "minutes");
  var nextArrival = moment(nextTrain).format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  console.log("ARRIVAL TIME: " + nextArrival);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minutesTillTrain + "</td></tr>");
});