import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Platform } from "react-native";

// need to use firebase config since im not using react-native-modeling. i haven ejected the expo app. 
// so this is a simple way to use firebase.
// when creating a web-app in firebase you will get a config object that looks like this.
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

/* const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  }); */

  
// need to use different persistence for web and react-native app
/* let auth; */

// if the platform is ios or android then use getReactNativePersistence else use getAuth. had some error with auth import in home.tsx
/* if (Platform.OS === 'ios' || Platform.OS === 'android') {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
    });
} else {
  auth = getAuth(app);
} */

//initialize firebase firestore
const FIRESTORE_db = getFirestore(app);

export {FIRESTORE_db,app,auth };