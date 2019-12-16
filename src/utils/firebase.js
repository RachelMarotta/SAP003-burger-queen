import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB4c-jD-BR03eC7sguXc3V5hyH6X_MKB5o",
    authDomain: "sap003-burger-queen-bce24.firebaseapp.com",
    databaseURL: "https://sap003-burger-queen-bce24.firebaseio.com",
    projectId: "sap003-burger-queen-bce24",
    storageBucket: "sap003-burger-queen-bce24.appspot.com",
    messagingSenderId: "528064142737",
    appId: "1:528064142737:web:f8cb63ef5efe039ad3ce30"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestoreApp = firebaseApp.firestore();

export default firestoreApp;