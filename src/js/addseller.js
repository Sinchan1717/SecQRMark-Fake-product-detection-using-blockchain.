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

  const db = firebase.database();
  
  function addsellertodb() {
      // Get all our input fields
      var SellerName = document.getElementById('SellerName').value;
      var SellerBrand = document.getElementById('SellerBrand').value;
      var SellerManager = document.getElementById('SellerManager').value;
      var SellerAddress = document.getElementById('SellerAddress').value;
      var SellerCode =document.getElementById('SellerCode').value
      var phone = document.getElementById('SellerPhoneNumber').value;
    //   var ManufacturerId = document.getElementById('ManufacturerId').value;

  
      
  
      // Create User data
      var seller_data = {
        SellerName: SellerName,
        SellerBrand: SellerBrand,
        SellerManager:SellerManager,
        SellerAddress:SellerAddress,
        SellerCode:SellerCode,
        phone:phone

        //   last_login: Date.now()
      };
  
      // Push to Firebase Database using phone number as key
      db.ref("sellers/" + phone).set(seller_data)
      .then(function() {
              // Done
              alert('Seller Created!');
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
              alert('Error creating seller: ' + error.message);
          });
  }
  
  
  