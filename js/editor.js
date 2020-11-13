/* eslint-disable no-unused-vars */
const editor = document.getElementById('editor');
const save = document.getElementById('save');
let userId = '';
let userName = '';
let dos = '';

// eslint-disable-next-line no-undef
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		userId = user.uid;
		userName = user.displayName;
		getSingleDocDetails(userId);
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

editor.addEventListener('keyup', (e) => {
	console.log(e.target.innerHTML);
	dos = e.target.innerHTML;
	localStorage.setItem('document', dos);
});

save.addEventListener('click', e => {
	e.preventDefault();
	const send = localStorage.getItem('document');
	console.log(send);
	addDoc(send);
});

function addDoc(dus) {
	console.log(dus);
	// eslint-disable-next-line no-undef
	firebase
		.firestore()
		.collection('docs')
		.doc(userId)
		.collection('documents')
		.add({
			name: userName,
			createdAt: new Date(),
			updated: new Date(),
			content: dus,
		});
}

// eslint-disable-next-line no-unused-vars
function getSingleDocDetails(Id){
	let data = localStorage.getItem('data');
	console.log(data);
	// eslint-disable-next-line no-undef
	firebase
		.firestore()
		.collection('docs')
		.doc(Id)
		.collection('documents')
		.doc(data)
		.get()
		.then((doc) => {
			// 
			if (doc.exists) {
				console.log('Document data:', doc.data());
				editor.innerHTML += doc.data().content;
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		}).catch(function(error) {
			console.log('Error getting document:', error);
		});
}