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

firebase.initializeApp(firebaseConfig);

// Get a reference to Realtime Database
const db = firebase.database();

async function sendOTP() {
  try {
    // Get phone number from input
    const phoneNumber = document.getElementById('phone').value;

    // Check if phone number exists in sellers collection
    const sellerRef = db.ref("sellers/" + phoneNumber); // Use ref for Realtime Database
    const sellerSnapshot = await sellerRef.once('value'); // Fetch data once

    // Phone number not found
    if (!sellerSnapshot.exists()) {
      document.getElementById('status').innerText = "Phone number not found in sellers collection!";
      return;
    }

    // Phone number found, proceed with OTP
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    console.log(phoneNumber)
    await firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        document.getElementById('status').innerText = "OTP sent to " + phoneNumber + ". Check your phone and enter the code.";
        
        // Reset recaptchaVerifier
        recaptchaVerifier.clear();
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        document.getElementById('status').innerText = "Error: " + error.message;
      });
  } catch (error) {
    console.error("Error checking phone number or sending OTP:", error);
    document.getElementById('status').innerText = "An error occurred. Please try again.";
  }
}
function verifyOTP() {
    var otp = document.getElementById('otp').value;

    confirmationResult.confirm(otp)
        .then(function (result) {
            // User signed in successfully.
            var user = result.user;
            document.getElementById('status').innerText = "OTP verification successful for " + user.phoneNumber;
            const sellerRef = db.ref("sellers/" + user.phoneNumber); // Assuming the seller's phone number is used as the key
            sellerRef.once('value', function(snapshot) {
                const sellerDetails = snapshot.val(); // Retrieve seller details
                // Store seller details in local storage
                localStorage.setItem('sellerDetails', JSON.stringify(sellerDetails));
            });
            window.location.href = "seller.html";

        })
        .catch(function (error) {
            console.error(error);
            document.getElementById('status').innerText = "Error: " + error.message;
        });
}

function validate_email(email) {
    // Add email validation logic here if needed
    return true;
}

function validate_field(field) {
    return field.trim() !== '';
}