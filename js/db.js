let userId = '';
// eslint-disable-next-line no-undef
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		userId = user.uid;
		console.log(userId);
		getDocuments(userId);
	} else {
		console.log(user + '' + 'logged out');
	}
});

function getDocuments(id) {
	// eslint-disable-next-line no-undef
	const booksRef = firebase
		.firestore()
		.collection('books')
		.doc(id);
	booksRef
		.get()
		.then((snapshot) => {
			const data = snapshot.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			console.log('All data in \'books\' collection', data); 
			console.log(snapshot);
			// [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]
		});
}

