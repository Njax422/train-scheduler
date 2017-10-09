  var config = {
    apiKey: "AIzaSyB6qqhbh5XiyWXU0jJ4gE24lepb4a92EQM",
    authDomain: "train-scheduler-20fa6.firebaseapp.com",
    databaseURL: "https://train-scheduler-20fa6.firebaseio.com",
    projectId: "train-scheduler-20fa6",
    storageBucket: "train-scheduler-20fa6.appspot.com",
    messagingSenderId: "338736502184"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var frequency = 0;
  var nextArrival = 0;
  var minutesAway = 0;
  var firstTrain = 0;

$("#addTrain").on("click", function(){
  event.preventDefault();
	console.log("Add train button clicked");
	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	firstTrain = $("#firstTrain").val().trim();
	frequency = $("#frequency").val().trim();

	database.ref().push({
	  	trainName: trainName,
	  	destination: destination,
	  	firstTrain: firstTrain,
	  	frequency: frequency
	})

  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrain").val("");
  $("#frequency").val("");
})


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;


//Calculcation Pseudo code

// Next Arrival = Star time + frequency, take into account current time and change after passing that time

//Minutes away = Next arrival - current time






  // Prettify the employee start
  // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // // Calculate the months worked using hardcore math
  // // To calculate the months worked
  // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  // console.log(empMonths);

  // // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);






  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  firstTrain + "</td><td>" + frequency + "</td><td>");
});









