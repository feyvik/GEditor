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
	let db = firebase.firestore()
		.collection('docs');
	db.get()
		.then((snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			console.log(data); 
			// [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]
		});
}

