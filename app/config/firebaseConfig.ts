import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Platform } from "react-native";


// need to use firebase config since im not using react-native-modeling. i haven ejected the expo app. 
// so this is a simple way to use firebase.
// when creating a web-app in firebase you will get a config object that looks like this.
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID // You need to fill this from the Firebase console.
    
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