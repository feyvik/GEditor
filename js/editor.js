/* eslint-disable no-unused-vars */
const editorContainer = document.getElementById('editorContainer');
const editor = document.getElementById('editor');
console.log(editorContainer, editor, 'eeee');

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

// function addDoc(editor) {
// 	console.log(editor);
// eslint-disable-next-line no-undef
// firebase
// 	.firestore()
// 	.collection('docs')
// 	.doc(id)
// 	.collection('documents')
// 	.add({
// 		name: 'Bread',
// 		createdAt: new Date(),
// 		updated: new Date(),
// 		content: 'my cv is written on white papaer with a red pen',
// 	});
// }
