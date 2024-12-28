import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// need to use firebase config since im not using react-native-modeling. i haven ejected the expo app. 
// so this is a simple way to use firebase.
const firebaseConfig = {
    apiKey: 'AIzaSyAzPP4CotwcwStED9UkpxkYsVn9CSFv4Lg',
    authDomain: 'shoppinglist-1ad35.firebaseapp.com',
    projectId: 'shoppinglist-1ad35',
    storageBucket: 'shoppinglist-1ad35.firebasestorage.app',
    messagingSenderId: '261337854136',
    appId: '1:261337854136:ios:90d28607ad5ac0ccb1844d' // You need to fill this from the Firebase console.
    
};

// initialize firebase app
const app = initializeApp(firebaseConfig);
//initialize firebase auth
const auth = getAuth(app);

export {app,auth };