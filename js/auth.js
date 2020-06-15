/* eslint-disable no-unused-vars */
function signUpWithEmailAndPassword(email, password, fullname) {}

function signInWithEmailAndPassword(email, password) {}

function authenticateWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  // firebase.auth().signInWithPopup(provider);
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const userDetails = {
        token: result.credential.accessToken,
        user: result.user.displayName,
        photo: result.user.photoURL,
        uid: result.user.uid,
      };
      console.log(userDetails);
      window.location.replace("./profile.html");
      console.log(result.user);
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
