let row = 0;

let currentTime = moment();
console.log(currentTime);



//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyBYRFPIf8n1FSldXjkNHSyn6acyUXcrZYc",
//     authDomain: "trainapp-99104.firebaseapp.com",
//     databaseURL: "https://trainapp-99104.firebaseio.com",
//     projectId: "trainapp-99104",
//     storageBucket: "trainapp-99104.appspot.com",
//     messagingSenderId: "816275816192"
//   };
//   firebase.initializeApp(config);

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCM6vMnWxAYLmwzHBizhZLIQEQF6iz_H-c",
    authDomain: "informationdb-974af.firebaseapp.com",
    databaseURL: "https://informationdb-974af.firebaseio.com",
    projectId: "informationdb-974af",
    storageBucket: "informationdb-974af.appspot.com",
    messagingSenderId: "937471337573"
  };
  firebase.initializeApp(config);





  var database = firebase.database();

  var uiConfig = {
    signInSuccessUrl: 'https://www.google.com',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
    //   firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>'
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);

  let dbName = "";
  let dbDestination = "";
  let dbFrequency = "";
  let dbNextArrivalTime = "";
  let dbMinsAway = "";


database.ref().once("value", function(snapshot) {

    for (var key in snapshot.val()) {

        let tr = $("<tr>");
        let th = $("<th>");
        let td1 = $("<td>");
        let td2 = $("<td>");
        let td3 = $("<td>");
        let td4 = $("<td>");
        let td5 = $("<td>");

         //console.log(key);

        console.log(snapshot.child(key).val().trainName);
        dbName = snapshot.child(key).val().trainName;
        console.log(snapshot.child(key).val().destination);
        dbDestination = snapshot.child(key).val().destination;
        console.log(snapshot.child(key).val().frequency);
        dbFrequency = snapshot.child(key).val().frequency;
        dbNextArrivalTime = snapshot.child(key).val().nextArrivalTime;
        dbMinsAway = snapshot.child(key).val().minutesAway;


        
$("tbody").append(tr);
th.attr("scope","row");
row++ ;
th.text(row);
tr.append(th);

td1.text(dbName);
tr.append(td1);

td2.text(dbDestination);
tr.append(td2);

td3.text(dbFrequency);
tr.append(td3);

td4.text(dbNextArrivalTime);
tr.append(td4);

td5.text(dbMinsAway);
tr.append(td5);
        


    }
});

// setInterval(updateTimes,10000)

// function updateTimes(){
//     console.log("here")

//     database.ref().once("value", function(snapshot) {

//         for (var key in snapshot.val()) {
    
//             let tr = $("<tr>");
//             let th = $("<th>");
//             let td1 = $("<td>");
//             let td2 = $("<td>");
//             let td3 = $("<td>");
//             let td4 = $("<td>");
//             let td5 = $("<td>");
    
//              //console.log(key);
    
//             console.log(snapshot.child(key).val().trainName);
//             dbName = snapshot.child(key).val().trainName;
//             console.log(snapshot.child(key).val().destination);
//             dbDestination = snapshot.child(key).val().destination;
//             console.log(snapshot.child(key).val().frequency);
//             dbFrequency = snapshot.child(key).val().frequency;
//             dbNextArrivalTime = snapshot.child(key).val().nextArrivalTime;
//             dbMinsAway = snapshot.child(key).val().minutesAway;
//             dbMinsAway = dbMinsAway -1;

//             database.ref(key).update({
//                 minutesAway: dbMinsAway

//             });
    
//             console.log(dbMinsAway);
    
            
//     $("tbody").append(tr);
//     th.attr("scope","row");
//     row++ ;
//     th.text(row);
//     tr.append(th);
    
//     td1.text(dbName);
//     tr.append(td1);
    
//     td2.text(dbDestination);
//     tr.append(td2);
    
//     td3.text(dbFrequency);
//     tr.append(td3);
    
//     td4.text(dbNextArrivalTime);
//     tr.append(td4);
    
//     td5.text(dbMinsAway);
//     tr.append(td5);
            
    
    
//         }
//     });
// }









$("#submitTrain").on("click", function(event) {

    

    let tr = $("<tr>");
    let th = $("<th>");
    let td1 = $("<td>");
    let td2 = $("<td>");
    let td3 = $("<td>");
    let td4 = $("<td>");
    let td5 = $("<td>");

let trainName = $("#trainName").val();
let destination = $("#dest").val();
let firsTrain = $("#firstTime").val();
let freq = parseInt($("#freq").val());
//console.log(firsTrain);
let firsTrainConv = moment(firsTrain, "HHmm");
let firstTrainValue = moment(firsTrain, "HHmm").format("hh:mm a");
let checkFuture = firsTrainConv.diff(moment(),"minutes");
let minsFromFirst = moment().diff(firsTrainConv,"minutes");
let actualMinsAway = "";
let actualNextArrival = "";
console.log(minsFromFirst);
if (minsFromFirst > 0){
    let modulus = minsFromFirst % freq;
actualMinsAway = freq - modulus;
console.log("Minutes Away:"+actualMinsAway);
actualNextArrival = moment().add(actualMinsAway,"m").format("HH:mm a");
console.log("Next Arrival1:"+actualNextArrival);
} else{
    actualMinsAway = -(minsFromFirst);
    console.log("Minutes Away:"+actualMinsAway);
    actualNextArrival = firstTrainValue;
    console.log("Next Arrival2:"+actualNextArrival);
}

//console.log(minsFromFirst);
// let nextArrival ="";
// let minsAway= "";


//     nextArrival = firstTrainValue;

//    //nextArrival = moment(firsTrainConv).add(freq,"m").format("hh:mm a");


// let nextArrivalObj = moment(firsTrainConv).add(freq,"m");

// if (checkFuture > 0){
//     minsAway = checkFuture;
// }
// else minsAway = 1440 + checkFuture;



//console.log(minsAway);











// console.log(firsTrainConv.diff(currentTime));

// if (!moment().isBefore(firsTrainConv))
// alert("time is before current time, enter a time in the fututre please")
// else {

database.ref().push({

    trainName: trainName,
    destination: destination,
    frequency: freq,
    nextArrivalTime: actualNextArrival,
    minutesAway: actualMinsAway

});

database.ref().on("child_added", function(snapshot){

    dbName = snapshot.val().trainName;
    dbDestination = snapshot.val().destination;
    dbFrequency = snapshot.val().frequency;
    dbNextArrivalTime = snapshot.val().nextArrivalTime
    dbMinsAway = snapshot.val().minutesAway

    
  
  });

$("tbody").append(tr);
th.attr("scope","row");
row++ ;
th.text(row);
tr.append(th);

td1.text(dbName);
tr.append(td1);

td2.text(dbDestination);
tr.append(td2);

td3.text(dbFrequency);
tr.append(td3);

td4.text(dbNextArrivalTime);
tr.append(td4);

td5.text(dbMinsAway);
tr.append(td5);


// }









});