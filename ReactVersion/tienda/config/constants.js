import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCul20riEsI6NEE2Ogr93H8TWv019s3BV4",
  authDomain: "tienda-online-e05ec.firebaseapp.com",
  databaseURL: "https://tienda-online-e05ec.firebaseio.com",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
