// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDsdeclCtRu1Z7dvPzFzRKCyj75NdqK1iE",
    authDomain: "fir-login-5beed.firebaseapp.com",
    databaseURL: "https://fir-login-5beed-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fir-login-5beed",
    storageBucket: "fir-login-5beed.appspot.com",
    messagingSenderId: "572699108832",
    appId: "1:572699108832:web:47feb60fc7938297d2b785",
    measurementId: "G-34KEH6FK1Y"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize variables
  const auth = firebase.auth();
  const database = firebase.database();
  
  // Set up our register function
  function register() {
    // Get all our input fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var full_name = document.getElementById('full_name').value;
    var mid = document.getElementById('mid').value;
    var locations = document.getElementById('location').value;
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!');
        return;
    }
    if (validate_field(full_name) == false || validate_field(mid) == false ) {
        alert('One or More Extra Fields is Outta Line!!');
        return;
    }
  
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        // Declare user variable
        var user = auth.currentUser;
  
        // Add this user to Firebase Database
        var database_ref = database.ref();
  
        // Create User data
        var user_data = {
            email : email,
            full_name : full_name,
            mid : mid,
            locations : locations,
            last_login : Date.now()
        };
  
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data);
  
        // Done
        alert('User Created!!');
    })
    .catch(function(error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code;
        var error_message = error.message;
  
        alert(error_message);
    });
  }
  
  function login() {
    // Get all our input fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!');
        return;
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
        // Retrieve user details from Firebase
        var userRef = database.ref('users/' + auth.currentUser.uid);
        userRef.once('value').then(function(snapshot) {
            var userData = snapshot.val();
            // Redirect to a new page after successful login with user details
            // Example: redirect with local storage
            localStorage.setItem('user_data', JSON.stringify(userData));
            window.location.href = "manufacture.html";
        });
    })
    .catch(function(error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code;
        var error_message = error.message;
  
        alert(error_message);
    });
  }
  
  
  // Validate Functions
  function validate_email(email) {
    var expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    return password.length >= 6;
  }
  
  function validate_field(field) {
    return field && field.trim().length > 0;
  }
  