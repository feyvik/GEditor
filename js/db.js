let userId = '';
// eslint-disable-next-line no-undef
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		userId = user.uid;
	} else {
		console.log(user + '' + 'logged out');
	}
});

function getDocuments() {
	// eslint-disable-next-line no-undef
	const doc =	firebase
		.firestore()
		.collection('doc')
		// eslint-disable-next-line no-undef
		.doc(userId)
		.collection('documents');
	console.log(doc);
	
	doc.onSnapshot(snap => {
		snap.forEach(doc => {
			var todo = doc.data();
			console.log(todo);
			// todo.id = doc.id;
			// this.todos.push(todo);
		});
	});
}

getDocuments();
