var firebaseConfig = {
  apiKey: "AIzaSyAsG6B509P2CuHNPscEUbj37U2oaaWq4OQ",
  authDomain: "buddyblogdb.firebaseapp.com",
  databaseURL: "https://buddyblogdb.firebaseio.com",
  projectId: "buddyblogdb",
  storageBucket: "buddyblogdb.appspot.com",
  messagingSenderId: "222785122276",
  appId: "1:222785122276:web:5105ed633c76b45e9321f1",
  measurementId: "G-R4K9HWH7PW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.auth.Auth.Persistence.LOCAL;







//Login buttun starts here
$("#btn-login").click(function()
  {
  var email = $("#email").val();
  var password = $("#password").val();

  if(email != "" && password != ""){
      var result  = firebase.auth().signInWithEmailAndPassword(email, password);

      result.catch(function(error)
      {

          var errorCode= error.code;
          var errorMessage= error.message;

          console.log(errorCode);
          console.log(errorMessage);

          window.alert("Message : " + errorMessage);
      });  
  }else{
      window.alert("form is incomplete, please  fill in the empty fields.");
  }
});
//Login buttun ends here


//sigUp buttun starts here
$("#btn-signup").click(function()
{
var email = $("#email").val();
var password = $("#password").val();
var cPassword = $("#confirmpassword").val();

if(email != "" && password != "" && cPassword != ""){
    if(password == cPassword){

      var result  = firebase.auth().createUserWithEmailAndPassword(email, password);

    result.catch(function(error)
    {

        var errorCode= error.code;
        var errorMessage= error.message;

        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message : " + errorMessage);
      });
    }else{

      window.alert("The password field does not match the confirm password field");

    }
      
}else{
    window.alert("form is incomplete, please  fill in the empty fields.");
}
});
//siginUp buttun ends here


//logout buttun starts here
$("#btn-logout").click(function()
  {
      firebase.auth().signOut();
});
//Logout buttun ends here


//reset password buttun starts here
$("#btn-ResetPassword").click(function()
{
  var auth = firebase.auth();
var email = $("#email").val();

if(email != ""){
    auth.sendPasswordResetEmail(email).then(function()
    {
      window.alert("an email has been sent to : " + email + " please check your emails and veriy");
    })
    .catch(function(error)
    {

        var errorCode= error.code;
        var errorMessage= error.message;

        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message : " + errorMessage);
    });  
}else{
    window.alert("please enter your email address first.");
}
});

//Login buttun ends here

//Accont Seetings
$("#btn-update").click(function()
{
  var phoneNum = $("#phone").val();
  var StudentNum = $("#studentNum").val();
  var bio = $("#bio").val();
  var university = $("#university").val();
  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();
  var gender= $("#Gender").val();
  
  var rootRef = firebase.database().ref().child("Users");
  var userID = firebase.auth().currentUser.uid;
  var usersRef = rootRef.child(userID); 

if (phoneNum!="" && studentNum !="" && university!="" && firstName!="" && lastName !="" && gender!="" ) {

  var userData = 
  {
    "phone": phoneNum,
    "studentNum": StudentNum,
    "bio":bio,
    "firstName": firstName,
    "university":university,
    "lastName": lastName,
    "Gender": gender,
  };

usersRef.set(userData, function(error)
{

if (error) {

  var errorCode= error.code;
  var errorMessage= error.message;

  console.log(errorCode);
  console.log(errorMessage);

  window.alert("Message : " + errorMessage);
  
} else {
  window.location.href= "MainPage.html";
  
}



});

} else {
  window.alert("form is incomplete, please  fill in the empty fields.");
}

});

function switchView(view){
$.get({
  url:view,
  cache:false,
})
.then(function(data){
  $("#container").html(data);
});

}


$("#btn-profie").click(function()
{
  window.location.href="profile.html"
});

///////////////////////Profile page///////////////////////////////////////////////////
$("#btn-goProfile").click(function(){
  window.location.href="updateProfile.html"
  
  });
///////////////////////Profile page///////////////////////////////////////////////////

// Update profie page 
/*
$("#btn-pro_Update").click(function()
{

var bio = $("#updBio").val();

var rootRef = firebase.database().ref().child("Users");
var userID = firebase.auth().currentUser.uid;
var usersRef = rootRef.child(userID); 

if (bio!=""  ) {

var userData = 
{
 
  "bio":bio,
  
};

usersRef.set(userData, function(error)
{

if (error) {

var errorCode= error.code;
var errorMessage= error.message;

console.log(errorCode);
console.log(errorMessage);

window.alert("Message : " + errorMessage);

} else {
  window.alert("Profile successfully updated!");

}



});

} else {
window.alert("form is incomplete, please  fill in the empty fields.");
}

});
*/



$("#btn-pro_Update").click(function()
{

  var phoneNum = $("#upd_phone").val();
var StudentNum = $("#upd_studentNum").val();
var bio = $("#upd_bio").val();
var university = $("#upd_university").val();
var firstName = $("#upd_firstName").val();
var lastName = $("#upd_lastName").val();
var gender= $("#upd_Gender").val();
var userName = $("upd_userName").val();

  var rootRef = firebase.database().ref().child("Users");
  var userID = firebase.auth().currentUser.uid;
  var usersRef = rootRef.child(userID); 
  var user = firebase.auth().currentUser;

if ( bio!=""  ) {

  usersRef.update({

  
  "bio":bio,
  "firstName": firstName,
  "lastName": lastName,
  "phone": phoneNum,
  "studentNum":StudentNum,

});

console.log(bio);


} else {
window.alert("form is incomplete, please  fill in the empty fields.");
}

});

function updatefirebase(){
  
}

///////////////////////////////comments//////////////////////////////////

//Rootref is the whole database.
const rootRef = firebase.database().ref();
//commentsRef is just the pageCountsNode
const commentsRef = rootRef.child('comments');
//Listen for click on Submit Comment button, and post comment.
document.getElementById("btnSubmitComment").addEventListener("click", function () {
    //Replace line breaks in comment with br tags.
    var newcomment = document.getElementById('txComment').value.replace(/\n/g, "<br>");
    //Define a new, keyed post.
    var newPostRef = commentsRef.push();
    //Fill tne new keyed post with data
    newPostRef.set({
        name: document.getElementById('tbName').value.trim(),
        comment: newcomment.trim(),
        frompage: location.pathname,
        when: firebase.database.ServerValue.TIMESTAMP
    });
});

function showpastcomments() {
    var showat = document.getElementById('pastcomments');
    //Get comments whose from page equals this page's pathname.
    var commentsRef = firebase.database().ref('comments/').orderByChild('frompage').equalTo(location.pathname);
    commentsRef.once('value', function (snapshot) {
        snapshot.forEach(function (itemSnapshot) {
            //Get the object for one snapshot
            var itemData = itemSnapshot.val();
            var comment = itemData.comment;
            var name = itemData.name;
            var when = new Date(itemData.when).toLocaleDateString("en-us");
            showat.innerHTML += "<li>" + comment + "<span> -- " + name + " (" + when +
                ")</span></li>";
        })
    })
}
//Called when page first opens and also after Submit button click to show all comments for this page.
showpastcomments()

///////////////////////////////comments//////////////////////////////////