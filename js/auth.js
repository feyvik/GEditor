/* eslint-disable no-unused-vars */
function signUpWithEmailAndPassword(email, password, fullname) {}

function signInWithEmailAndPassword(email, password) {}

function authenticateWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

var signInButtonElement = document.getElementById("sign-in")
signInButtonElement.addEventListener('click', authenticateWithGoogle)