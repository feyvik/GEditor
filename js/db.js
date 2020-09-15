const newDoc = document.getElementById('createNewDoc');
let userId = '';
const doc = document.getElementById('document');

// eslint-disable-next-line no-undef
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		userId = user.uid;
		getDocuments(userId);
		addDoc(userId);
	} else {
		console.log(user + '' + 'logged out');
	}
});

newDoc.addEventListener('click', e => {
	e.preventDefault();
	window.location.href = '../editor.html';
});

// function getFullName(user, fullname) {
// 	// // eslint-disable-next-line no-undef
// 	// var user = firebase.auth().currentUser;
// 	console.log(user, fullname);
// 	user.updateProfile({
// 		displayName: fullname,
// 		photoURL: 'https://example.com/user/profile.jpg'
// 	}).then(function() {
// 		// Update successful.
// 		console.log(user.displayName);
// 	}).catch(function(error) {
// 		// An error happened.
// 		console.log(error);
// 	});

// }

function getDocuments(id) {
	// eslint-disable-next-line no-undef
	let db = firebase.firestore()
		.collection('docs')
		.doc(id)
		.collection('documents');
	db.get()
		.then((snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			console.log(data);
			for (let i = 0; i < data.length; i++) {
				doc.innerHTML = `
				<div class="documents" id="${data[i].userId}">
					<div class="doc-date">
						<h4>Today</h4>
						<div class="doc-date-info">
							<p><i class="fa fa-book"></i> ${data[i].name} <i class="fa fa-users"></i></p>
						</div>
					</div>
					<div class="doc-info">
						<h4>Owned by anyone</h4>
						<div class="doc-info-status">
							<p>${data[i].name}</p>
						</div>
					</div>
					<div class="doc-open">
						<h4>Last opened</h4>
						<div class="doc-open-date">
							<p>${data[i].updated} <i class="fa fa-ellipsis-v"></i></p>
						</div>
					</div>   
  			</div>
				`;
				console.log(data[i].updated);
			}
		});
}


function addDoc(id) {
	// eslint-disable-next-line no-undef
	firebase
		.firestore()
		.collection('docs')
		.doc(id)
		.collection('documents')
		.add({
			name: 'new book',
			createdAt: new Date(),
			updated: new Date(),
			content: 'my cv is written on white papaer with a red pen',
		});
}
addDoc();
