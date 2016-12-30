;(function () {
  const qs = document.querySelector.bind(document)
  const qsa = document.querySelectorAll.bind(document)
  const config = {
    apiKey: 'AIzaSyASyi8tAMBNOryScXRnrfLBV93O_9lTDYw',
    authDomain: 'track-emotions.firebaseapp.com',
    databaseURL: 'https://track-emotions.firebaseio.com',
    storageBucket: 'track-emotions.appspot.com',
    messagingSenderId: '168469567805'
  }
  firebase.initializeApp(config);

  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      qs('#user--name').textContent = `${user.displayName}'s emotions`;
      //qs('#user--photo').src = user.photoURL;
    }else {
      firebase.auth().signInWithRedirect(provider);
    }
  })
}())
