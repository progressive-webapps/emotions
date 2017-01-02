;(function () {
  const painter = {
    greet(user) {
      document.querySelector('#user--info').textContent = `How are you feeling today?`
    // qs('#user--photo').src = user.photoURL
    },
    getEmotion(emotion) {
      const emo = document.createElement('span');
      emo.className = `emojicon e1a-${emotion}`;
      return emo;
    },
    drawEmotions() {
      const emotionsHolder = document.querySelector('#user--emotions');
      `smiley blush sunglasses unamused disappointed sob nauseated_face heart_eyes rage`
      .replace(/^[ /\n] /gm, '')
      .split(' ')
      .forEach(emotion => {
        emotionsHolder.appendChild(painter.getEmotion(emotion.trim()))
      });
    }
  }
  firebase.initializeApp(config)

  var provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      painter.greet(user)
      //painter.drawEmotions()
    } else {
      firebase.auth().signInWithRedirect(provider)
    }
  })
}())
