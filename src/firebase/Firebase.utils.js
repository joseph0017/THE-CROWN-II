import firebase from 'firebase/app'
import'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCKjgqHSQOq0mL_-nQ3we31npkl7EqZB24",
    authDomain: "crown-db-800ef.firebaseapp.com",
    projectId: "crown-db-800ef",
    storageBucket: "crown-db-800ef.appspot.com",
    messagingSenderId: "310745631372",
    appId: "1:310745631372:web:4884728a24868a5b2bc9a9"
  };

export const createUserProfileDocument = async(userAuth, additonalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additonalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef
}


firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase