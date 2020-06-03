import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA-VE-uUlhQkrrYCKF6cz6BftmPxYahO1w',
  authDomain: 'appointmedweb.firebaseapp.com',
  databaseURL: 'https://appointmedweb.firebaseio.com',
  projectId: 'appointmedweb',
  storageBucket: 'appointmedweb.appspot.com',
  messagingSenderId: '1063993361955',
  appId: '1:1063993361955:web:2f869e9f80c1167a059396'
}

let app = null

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}

export default firebase
