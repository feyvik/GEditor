/* eslint-disable no-unused-vars */

// Declare Variables
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorMessage = document.getElementById("error");
const spanLoading = document.getElementById("spanLoading");
const spanSignUp = document.getElementById("spanSignUp");
const signUpForm = document.getElementById("signUpForm");
const signInGoogleButton = document.getElementById("sign-in");

// sign up with email and password function
function signUpWithEmailAndPassword(email, password, fullname) {
  errorMessage.innerText = "";
  spanSignUp.style.display = "none";
  spanLoading.style.display = "block";

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (resp) {
      window.location.href = "../index.html";
    })
    .catch(function (error) {
      spanLoading.style.display = "none";
      spanSignUp.style.display = "block";

      if (error.code == "auth/weak-password") {
        errorMessage.innerText = error.message;
      }

      if (error.message) {
        errorMessage.innerText = error.message;
      }
      console.log(error.message);
    });
}

// sign in with email and password function
function signInWithEmailAndPassword(email, password) {}

// Googl auth login
function authenticateWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      window.location.href = "../index.html";
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
    });
}

signInGoogleButton.addEventListener("click", authenticateWithGoogle);

function validateEmail() {
  errorMessage.innerText = "";
  var x = email.value;
  var atposition = x.indexOf("@");
  var dotposition = x.lastIndexOf(".");
  if (
    atposition < 1 ||
    dotposition < atposition + 2 ||
    dotposition + 2 >= x.length
  ) {
    spanLoading.style.display = "none";
    spanSignUp.style.display = "block";

    const erroremail = document.getElementById("error");
    erroremail.innerHTML = "Please enter a valid e-mail address";
    return;
  }
  signUpWithEmailAndPassword(email.value, password.value, fullname.value);
}

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateEmail();
});
