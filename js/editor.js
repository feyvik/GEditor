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


function chooseColor() {
	const color = document.getElementById('myColor').value;
	document.execCommand('foreColor', false, color);
}

function changeFont() {
	const Font = document.getElementById('input-font').value;
	document.execCommand('fontName', false, Font);
}

function changeSize() {
	const size = document.getElementById('fontSize').value;
	document.execCommand('fontSize', false, size);
}

function addDoc() {
	const docId = localStorage.getItem('token');
	const word = localStorage.getItem('document');
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
			// 
			if (doc.exists) {
				loading.style.display = 'none';
				editor.innerHTML += doc.data().content;
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		}).catch(function(error) {
			console.log('Error getting document:', error);
		});
}

editor.addEventListener('keydown', (e) => {
	dos = e.target.innerHTML;
	localStorage.setItem('document', dos);
	setTimeout(() => {
		addDoc();
		loading.style.display = 'block';
	}, 3000);
});

function init(){
	const token = localStorage.getItem('token');
	if(!token){
		// eslint-disable-next-line no-undef
		const docId = firebase.firestore().collection('docs').doc(userId).collection('documents').doc().id;
		localStorage.setItem('token', docId);
	}else{
		setTimeout(() => {
			getSingleDocDetails(token);
			loading.style.display = 'block';
		}, 3000);
	}
}
