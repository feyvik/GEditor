const newDoc = document.getElementById('createNewDoc');
let userId = '';
const docBook = document.getElementById('documents');
const holdDoc = [];
const searchForm = document.getElementById('searchForm');

// eslint-disable-next-line no-undef
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		userId = user.uid;
		getDocuments(userId);
		searchDoc(userId);
		// addDoc(userId);
	} else {
		console.log(user + '' + 'logged out');
	}
});

// get all documents
function getDocuments(id) {
	// eslint-disable-next-line no-undef
	let db = firebase.firestore()
		.collection('docs')
		.doc(id)
		.collection('documents');
	db.get()
		.then((querySnapshot) => {
			querySnapshot.forEach(function(doc) {
				holdDoc.push(doc.data());
				showDoc();
			});
		});
}

// show all documents
function showDoc() {
	docBook.innerHTML = null;
	for (let i = 0; i < holdDoc.length; i++){
		console.log(holdDoc[i].name);
		let date = new Date( holdDoc[i].updated.toMillis());
		let hour = date.getHours();
		let sec = date.getSeconds();
		let minutes = date.getMinutes();
		var ampm = hour >= 12 ? 'pm' : 'am';
		hour = hour % 12;
		hour = hour ? hour : 12;
		var strTime = hour + ':' + minutes + ':' + sec + ' ' + ampm;
		docBook.innerHTML += `
      <div class="row" id="${holdDoc[i].id}">
        <div class="doc-date-info col-5">
		 			<p><i class="fa fa-book"></i> ${holdDoc[i].name}  <i class="fa fa-users"></i></p>
		 		</div>
		 		<div class="doc-info-status col-4">
		 			<p>${holdDoc[i].name}</p>
		 		</div>
		 		<div class="doc-open-date col-3">
		 			<p> ${strTime} <i class="fa fa-ellipsis-v"></i></p>
		 		</div>
      </div>
    </div>
			 `;
	}
}

//search form 
// searchForm.addEventListener('keyup', e => {
// 	e.preventDefault();
// 	const search = 'bread';
// 	console.log
// 	searchDoc(search);
// });

//search document function
function searchDoc(id) {
	const search = 'content';
	console.log(id, search);
	// eslint-disable-next-line no-undef
	firebase.firestore()
		.collection('documents')
		.where(search, '==', id).get()
		.then((querySnapshot) => {
			console.log(querySnapshot);
		});
}

// redirect to editor
newDoc.addEventListener('click', e => {
	e.preventDefault();
	window.location.href = '../editor.html';
});


// function addDoc(id) {
// 	// eslint-disable-next-line no-undef
// 	firebase
// 		.firestore()
// 		.collection('docs')
// 		.doc(id)
// 		.collection('documents')
// 		.add({
// 			name: 'Bread',
// 			createdAt: new Date(),
// 			updated: new Date(),
// 			content: 'my cv is written on white papaer with a red pen',
// 		});
// }
