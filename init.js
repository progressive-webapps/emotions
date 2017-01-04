;(function () {
  const painter = {
    greet(user) {
      const name = user.displayName.split(' ')[0]
      document.querySelector('#user--info').textContent = `Hi ${name}, how are you feeling today?`
    }
  }
  firebase.initializeApp(config)

  let database, uid
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
        painter.greet(user)
        uid = user.uid
        database = firebase.database().ref(`${uid}/`)
        getPastEmotions()
    }
    else firebase.auth().signInWithRedirect(provider)
  })

  const getPastEmotions = () => {
      if (!database) return
      database.orderByKey().limitToLast(5).once('value')
      .then(snapshot => {
          const emotions = Object.values(snapshot.val()).reverse()
          const pastSelector = document.querySelector('#user--selected-emotion .past')
          pastSelector.innerHTML = ''
          emotions.map(emoji => pastSelector.innerHTML += `<div class="emojicon e1a-${emoji}"></div>`)
      })
  }

  const logEmotion = emoji => {
      if (!database) return
      const emotions = {}
      emotions[new Date().getTime()] = emoji
      return database.update(emotions)
  }

  const getEmojiFromClass = className => {
      return className.replace('emojicon', '').trim().replace('e1a-', '')
  }

  const emojiSelected = emoji => {
      document.querySelector('#user--info').className += ' hidden'
      document.querySelector('#user--emotions').className += ' hidden'
      document.querySelector('#user--selected-emotion .emojicon').className += ` e1a-${emoji}`
      document.querySelector('#user--selected-emotion').style.display = 'block'
  }

  document.querySelectorAll('.emojicon').forEach(element => element.addEventListener('click', event => {
      const emoji = getEmojiFromClass(event.target.className)
      logEmotion(emoji)
      emojiSelected(emoji)
  }))
}())
