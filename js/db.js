const newDoc = document.getElementById('createNewDoc');
let userId = '';
const docBook = document.getElementById('documents');
let holdDoc = [];
const searchForm = document.getElementById('searchForm');
const search = document.getElementById('search');



/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
// eslint-disable-next-line no-unused-vars
function myFunction() {
	document.getElementById('myDropdown').classList.toggle('show');
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
	if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName('dropdown-content');
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
};

// eslint-disable-next-line no-undef
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		userId = user.uid;
		getDocuments(userId);
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
						<div class="dropdown">
						<p> ${strTime} <i class="fa fa-ellipsis-v dropbtn" onclick="myFunction()" ></i></p>
							<div id="myDropdown" class="dropdown-content">
								<a href="#" target="_blank" >Delete Doc</a>
								<a href="#">Open in New Tab</a>
							</div>
						</div>
		 		</div>
      </div>
    </div>
			 `;
	}
}


// search document function
function searchDoc(content) {
	// eslint-disable-next-line no-undef
	let db = firebase.firestore()
		.collection('docs')
		.doc(userId)
		.collection('documents')
		.where('name', '==', content);
	db.get()
		.then(function(querySnapshot) {
			querySnapshot.forEach(function (doc) {
				holdDoc = [];
				holdDoc.push(doc.data());
				showDoc();
				console.log(doc.id, ' => ', doc.data());
			});
		})
		.catch(function(error) {
			console.log('Error getting documents: ', error);
		});
}



searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	searchDoc(search.value);
});


// redirect to editor
newDoc.addEventListener('click', e => {
	e.preventDefault();
	window.location.href = '../editor.html';
});