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
  var tFrequency = frequency;
  var firstTime = firstTrain;

  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTrainFormatted = moment(nextTrain).format("hh:mm A");

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  nextTrainFormatted + "</td><td>" + frequency + "</td><td>"
   + tMinutesTillTrain + "</td><td>"
   );
});