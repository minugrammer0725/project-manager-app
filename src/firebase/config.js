// 1) npm install firebase@8.5

// 2) import firebase and services.
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// 3) config object.
const firebaseConfig = {
  apiKey: "AIzaSyCt37WP85vjkOmuhBbYYWoaGN7I8Vk9jis",
  authDomain: "project-manager-b9edf.firebaseapp.com",
  projectId: "project-manager-b9edf",
  storageBucket: "project-manager-b9edf.appspot.com",
  messagingSenderId: "830183649359",
  appId: "1:830183649359:web:3b533229638091bcaefa3a",
};

// 4) initialize firebase & services.
firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// 5) timestamp helper function.
const timestamp = firebase.firestore.Timestamp;

// 6) export services.
export { projectFirestore, projectAuth, projectStorage, timestamp };

// 7) Connect to firebase CLI
/*
  step 1: "firebase init" on terminal. press 'y' to proceed.
  step 2: select "Firestore", "Hostings" and" Storage" by pressing space bar.
  step 3: use an existing project -> connect to the firebase project.
  step 4: Firestore Rules -> hit enter (default)
  step 5: Firestore Indexes -> hit enter (default)
  step 6: Type in "build" to change build directory from public -> build
  step 7: singe-page-app: press y (yes)
  step 8: Automatic builds and deploy with Git: press n/enter (no)
  step 9: Storage Rules -> hit enter (default)

*/
