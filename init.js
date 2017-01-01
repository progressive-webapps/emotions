;(function () {
  const painter = {
    greet(user) {
      document.querySelector('#user--info').textContent = `Hey ${user.displayName} how are you feeling today?`
    // qs('#user--photo').src = user.photoURL
    },
    getEmotion(emotion) {
      const emo = document.createElement('span');
      emo.className = `em em-${emotion}`;
      return emo;
    },
    drawEmotions() {
      const emotionsHolder = document.querySelector('#user--emotions');
      `alien angel angry anguished astonished baby blush\ 
boar bug cactus confounded confused couple_with_heart\ 
cry cupid dancer dancers disappointed disappointed_relieved\ 
dizzy exclamation expressionless fearful ghost grin hear_no_evil\ 
heart_eyes honeybee innocent joy kiss kissing laughing lips\ 
monkey_face open_mouth pig_nose pouting_cat sleepy smile snail sweat tongue zzz`
       .replace(/^[ /\n] /gm, '')
        .split(' ')
        .forEach(emotion => {
          emotionsHolder.appendChild(painter.getEmotion(emotion.trim()))
        });
    }
  }
  const config = {
    apiKey: 'AIzaSyASyi8tAMBNOryScXRnrfLBV93O_9lTDYw',
    authDomain: 'track-emotions.firebaseapp.com',
    databaseURL: 'https://track-emotions.firebaseio.com',
    storageBucket: 'track-emotions.appspot.com',
    messagingSenderId: '168469567805'
  }
  firebase.initializeApp(config)

  var provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      painter.greet(user)
      painter.drawEmotions()
    } else {
      firebase.auth().signInWithRedirect(provider)
    }
  })
}())
