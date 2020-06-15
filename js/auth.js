/* eslint-disable no-unused-vars */
function signUpWithEmailAndPassword(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);
  if (email.length < 4) {
    const erroremail = document.getElementById("error-email");
    erroremail.innerHTML = "Please enter an email address..";
    return;
  }
  if (password.length < 4) {
    const errorpassword = document.getElementById("error-password");
    errorpassword.innerHTML = "Please enter a password.";
    return;
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (resp) {
      window.location.replace("./index.html");
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        const errormessage = errorCode.message;
        let errorpassword = document.getElementById("error");
        errorpassword.innerHTML = `
      ${errormessage}
      `;
        errorpassword.style.display = "block";
        setTimeout(() => {
          errorpassword.style.display = "none";
        }, 3000);
      }
      const errormessage = error.message;
      let erroremail = document.getElementById("error");
      erroremail.innerHTML = `
      ${errormessage}
      `;
      erroremail.style.display = "block";
      setTimeout(() => {
        erroremail.style.display = "none";
      }, 3000);
    });
}

function signInWithEmailAndPassword(email, password) {}

function authenticateWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      window.location.replace("./index.html");
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
    });
}

const signUpButtonElement = document.getElementById("signup");
signUpButtonElement.addEventListener("click", signUpWithEmailAndPassword);
const signInGoogleButton = document.getElementById("sign-in");
signInGoogleButton.addEventListener("click", authenticateWithGoogle);
