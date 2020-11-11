/* eslint-disable no-unused-vars */
const editor = document.getElementById('editor');
let userId = '';
let userName = '';
let dos = '';

// eslint-disable-next-line no-undef
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		userId = user.uid;
		userName = user.displayName;
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
	addDoc(dos);
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
