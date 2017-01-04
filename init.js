;(function () {
  const painter = {
    greet(user) {
      const name = user.displayName.split(' ')[0]
      document.querySelector('#user--info').textContent = `Hi ${name}, how are you feeling today?`
    }
  }
  firebase.initializeApp(config)

  var provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().onAuthStateChanged(user => {
    if (user) painter.greet(user)
    else firebase.auth().signInWithRedirect(provider)
  })
}())
