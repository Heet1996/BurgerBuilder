import * as firebase from 'firebase';
  var firebaseConfig = {
    apiKey: "AIzaSyDAJPk0q8nu9yj5Z3ton3uVfm-h7TH0OuI",
    authDomain: "react-burgerbuilder-a3bac.firebaseapp.com",
    databaseURL: "https://react-burgerbuilder-a3bac.firebaseio.com",
    projectId: "react-burgerbuilder-a3bac",
    storageBucket: "react-burgerbuilder-a3bac.appspot.com",
    messagingSenderId: "59732549132",
    appId: "1:59732549132:web:4db326160ebd87ed691829"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export let firebaseObj=firebase;
  export let databaseRef=firebase.database().ref();
  export let auth=firebase.auth();

