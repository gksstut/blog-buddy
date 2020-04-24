var firebaseConfig = {
    apiKey: "AIzaSyA_oFEP4RWiDALCBXTkZcb6RV86I5tw_u8",
    authDomain: "buddy-blog-c0b0e.firebaseapp.com",
    databaseURL: "https://buddy-blog-c0b0e.firebaseio.com",
    projectId: "buddy-blog-c0b0e",
    storageBucket: "buddy-blog-c0b0e.appspot.com",
    messagingSenderId: "654686912462",
    appId: "1:654686912462:web:d97b78a5d1fa577b53359f",
    measurementId: "G-3865J0SCB3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  firebase.auth.Auth.Persistence.LOCAL;


  $("#btn-login").click(function(){
    var email = $("#email").val();
    var password = $("#email").val();

    if(email != "" && password != ""){
        var result  = firebase.auth().signInWithEmailAndPassword(email, password);
        result.catch(function(error){

            var errorCode= error.code;
            var errorMessage= error.message;

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("Message : " + errorMessage);
        })   
    }else{
        window.alert("form is incomplete, please  fill in the empty fields.");
    }
  });