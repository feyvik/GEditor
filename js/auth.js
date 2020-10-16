/* eslint-disable no-unused-vars */

// Declare Variables
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const password = document.getElementById('password');

const errorMessage = document.getElementById('error');
const spanLoading = document.getElementById('spanLoading');
const spanSignUp = document.getElementById('spanSignUp');
const signUpForm = document.getElementById('signUpForm');
const signInGoogleButton = document.getElementById('sign-in');

const logInForm = document.getElementById('logInForm');
const spanLogin = document.getElementById('spanLogin');

// sign up with email and password function
function signUpWithEmailAndPassword(email, password, fullname) {
	errorMessage.innerText = '';
	spanSignUp.style.display = 'none';
	spanLoading.style.display = 'block';

	if (!validateEmail(email)) {
		errorMessage.innerText = 'Please enter a valid e-mail address';
		spanLoading.style.display = 'none';
		spanSignUp.style.display = 'block';
		return;
	}

	if (!validatePwd(password)) {
		errorMessage.innerText =
			' Password must contain at least lowercase letter, one number, a special character and one uppercase letter';
		spanLoading.style.display = 'none';
		spanSignUp.style.display = 'block';
		return;
	}
	// eslint-disable-next-line no-undef
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(function (resp) {
			window.location.href = '../index.html';
		})
		.catch(function (error) {
			spanLoading.style.display = 'none';
			spanSignUp.style.display = 'block';

			if (error.code == 'auth/weak-password') {
				errorMessage.innerText = error.message;
			}

			if (error.message) {
				errorMessage.innerText = error.message;
			}
			console.log(error.message);
		});
}

// sign in with email and password function
function signInWithEmailAndPassword(email, password) {
	errorMessage.innerText = '';
	spanLogin.style.display = 'none';
	spanLoading.style.display = 'block';

	if (!validateEmail(email)) {
		errorMessage.innerText = 'Please enter a valid e-mail address';
		spanLoading.style.display = 'none';
		spanLogin.style.display = 'block';
		return;
	}

	if (!validatePwd(password)) {
		errorMessage.innerText =
			' Password must contain at least lowercase letter, one number, a special character and one uppercase letter';
		spanLoading.style.display = 'none';
		spanLogin.style.display = 'block';
		return;
	}
	// eslint-disable-next-line no-undef
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(function (resp) {
			window.location.href = '../index.html';
		})
		.catch(function (error) {
			spanLoading.style.display = 'none';
			spanLogin.style.display = 'block';

			if (error.code == 'auth/weak-password') {
				errorMessage.innerText = error.message;
			}

			if (error.message) {
				errorMessage.innerText = error.message;
			}
			console.log(error.message);
		});
}

// Google auth login
function authenticateWithGoogle() {
	// eslint-disable-next-line no-undef
	const provider = new firebase.auth.GoogleAuthProvider();
	// eslint-disable-next-line no-undef
	firebase
		.auth()
		.signInWithPopup(provider)
		.then(function (result) {
			window.location.href = '../index.html';
		})
		.catch(function (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.email;
			const credential = error.credential;
			console.log(errorCode, errorMessage, email, credential);
		});
}

signInGoogleButton.addEventListener('click', authenticateWithGoogle);

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}


function validatePwd(password) {
	var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
	return re.test(password);
}


function checkNullValus() {
	if (signUpForm === null) {
		logInForm.addEventListener('submit', (e) => {
			e.preventDefault();
			signInWithEmailAndPassword(email.value, password.value);
		});
	} else {
		signUpForm.addEventListener('submit', (e) => {
			e.preventDefault();
			signUpWithEmailAndPassword(email.value, password.value, fullname.value);
		});
	}
}


checkNullValus();