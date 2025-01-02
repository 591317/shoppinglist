import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";  
import { auth } from "./config/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { ActivityIndicator, View } from "react-native";


export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // use router for expo to navigate to the home page if we have a user logged in.
  const router = useRouter();
  const segments = useSegments();

  // check that the auth on state is working. this should be null when we start the app. since we are in the initializing state.
  const onAuthStateChangedcheck = (user: User | null) => {
    console.log('onAuthStateChanged', user);
    setUser(user);
    if (initializing) 
      setInitializing(false);
  };

  // this is used to check the auth state of the user.
  useEffect(() => {
    console.log('checking auth state');
    const subscriber = onAuthStateChanged(auth, onAuthStateChangedcheck);
    return subscriber;
  }, []);

  // use to check the state of the user and rout the user to the correct page. depending on the state of the user logged in or not
  useEffect(() => {
    console.log('inside useEffect of redirect');
    if (initializing) return;

    const inTabsGroup = segments[0] === '(tabs)';

    /* if (user) {
      if (user && !inTabsGroup) {
        router.replace('/(tabs)/home');
      } else if (!user && inTabsGroup) {
        router.replace('/');
      }
    } */

      if (user) {
        if (!inTabsGroup) {
        router.replace('/(tabs)/home');
        }
      } else {
        if (inTabsGroup) {
          router.replace('/');
      } 
     }
      
  }, [user, initializing,segments,router]);
  
  // if the initializing state is true then we return a loading symbol on screen.
  if (initializing)
    return(
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}>
      <ActivityIndicator size="large" />    
    </View>
  );

  return (
    <Stack>
      <Stack.Screen name="index" options={{headerTitle: "Shopping List"}}/>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    </Stack>
  );
}
