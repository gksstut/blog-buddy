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
firebase.initializeApp(config);
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