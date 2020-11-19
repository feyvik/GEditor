/* eslint-disable no-unused-vars */
const editor = document.getElementById('editor');
const loading = document.getElementById('loading');
let userId = '';
let userName = '';
let dos = '';

// eslint-disable-next-line no-undef
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		userId = user.uid;
		userName = user.displayName;
		init();
		// getSingleDocDetails(userId);
	} else {
		console.log(user + '' + 'logged out');
	}
});

// editor section
function format(command, value) {
	document.execCommand(command, false, value);
}

function changeFont() {
	const Font = document.getElementById('input-font').value;
	document.execCommand('fontName', false, Font);
}

function changeSize() {
	const size = document.getElementById('fontSize').value;
	document.execCommand('fontSize', false, size);
}

function addDoc(word) {
	const docId = localStorage.getItem('token');
	// eslint-disable-next-line no-undef
	firebase
		.firestore()
		.collection('docs').doc(userId).collection('documents').doc(docId).set({
			name: userName,
			createdAt: new Date(),
			updated: new Date(),
			content: word,
		})
		.then(() => {
			loading.style.display = 'none';
		})
		.catch(function(error) {
			console.error('Error writing document: ', error);
		});
}

// eslint-disable-next-line no-unused-vars
function getSingleDocDetails(docId){
	// eslint-disable-next-line no-undef
	firebase
		.firestore()
		.collection('docs')
		.doc(userId)
		.collection('documents')
		.doc(docId)
		.get()
		.then((doc) => {
			if (doc.exists) {
				loading.style.display = 'none';
				editor.innerHTML += doc.data().content;
			} else {
				console.log('No such document!');
			}
		}).catch(function(error) {
			console.log('Error getting document:', error);
		});
}

var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

editor.addEventListener('input', e => {
	dos = e.target.innerHTML;
	localStorage.setItem('document', dos);
	console.log(dos);
	delay(function(){
		const word =	localStorage.getItem('document');
		console.log(word);
	}, 1000 );
});


function init(){
	const token = localStorage.getItem('token');
	if(!token){
		// eslint-disable-next-line no-undef
		const docId = firebase.firestore().collection('docs').doc(userId).collection('documents').doc().id;
		localStorage.setItem('token', docId);
	}else{
		delay(function(){
			getSingleDocDetails(token);
			loading.style.display = 'block';
		}, 1000 );
	}
}

window.addEventListener('load', function () {
	const status = document.getElementById('status');
	const log = document.getElementById('log');
	function updateOnlineStatus() {
		if (navigator.onLine === true) {
			console.log('errrr');
			status.innerHTML = 'online'.toUpperCase();
			log.innerHTML = ' Status: ' + 'online';
			return (status.className = 'online');
		} else {
			console.log('errrr2');
			status.innerHTML = 'offline'.toUpperCase();
			log.innerHTML = ' Status: ' + 'offline';
			return (status.className = 'offline');
		}
	}
	updateOnlineStatus();
	updateOnlineStatus();
	window.addEventListener('online', updateOnlineStatus);
	window.addEventListener('offline', updateOnlineStatus);
});