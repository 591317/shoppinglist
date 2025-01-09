import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import React, { useEffect, useRef, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, Timestamp, updateDoc } from "firebase/firestore";
import { FIRESTORE_db } from "../config/firebaseConfig";
import { auth } from "../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { FlatList } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { NavigationProp } from "@react-navigation/native";
import { signOut } from 'firebase/auth';

// used to define the structure of the items in the Firestore database
export interface Item {
  title: string;
  done: boolean;
  id: string;
}

interface RouterPros {
  navigation: NavigationProp<any, any>;
}

const HomePage = ({navigation}: RouterPros) => {
  const [items, setItems] = useState<Item[]>([]);
  const [item, setItem] = useState('');
  const [user] = useAuthState(auth);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!user) {
      console.error("User is not authenticated");
      setItems([]);
      return;
    }

       // use itemRef to get the items from the Firestore database collections of the given user
    const itemRef = collection(FIRESTORE_db, `users/${user?.uid}/items`);
    //use itemQureyTimestamp to get the items timestampeds we added, and sort them by their timestamps
    const itemQureyTimestamp = query(itemRef, orderBy("timestamp", "desc"));

    const subscriber = onSnapshot(itemQureyTimestamp,{
      next: (snapshot) => {
        console.log("UPDATED in snapshot");

        const items: Item[] = [];
        snapshot.forEach((doc) => {
          items.push({ 
            id: doc.id, 
            ...doc.data() 
          } as Item);
        });

        setItems(items);
      },
      error: (error) => {
        console.error("Error getting documents: ", error);
      }

    });

    unsubscribeRef.current = subscriber;

    return () => {
      subscriber();
    }; 
   
  }, [user]);

  // function that signs out the user
  const signOutUser = async () => {
    try {
      if (unsubscribeRef.current) {
        console.log("Unsubscribing from Firestore listener before logout");
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      await signOut(auth);
      console.log('User has been signed out.');
    } catch (error) {
      console.error('Error signing out: ', error);
    }

  };
  
  // add items to the Firestore database
  const addItems = async () => {
    console.log("add item method");
      if (!user) {
        console.error("User is not authenticated from add item");
        return;
    }
    try {
      if (!item) {
        return;
      }
      console.log("add item");
      // the code that adds a collection to the Firestore database and each user has their own collection with their own items
     const doc = await addDoc(collection(FIRESTORE_db, `users/${user.uid}/items`), { title: item, done: false, timestamp: Timestamp.now() });
     console.log("Document written with ID: ", doc.id);
     setItem('');
      
    } catch (e) {
      console.error("Error adding document: ", e);
    }  
    
  };


  // the funtion that renders the items in the FlatList, where we can change toggle state from done or not done
  const renderItem = ({ item }: any) => {
    const ref = doc(FIRESTORE_db, `users/${user?.uid}/items/${item.id}`);

    const toggleDone = async () => {
      updateDoc(ref, {done: !item.done});
    };
    const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.item}>
          {item.done && <Ionicons name="checkmark-circle" size={30} color="green" />}
          {!item.done && <Entypo name="circle" size={30} color="#0782F9" />}

          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>

        <Ionicons name="trash" size={30} color="red" onPress={deleteItem} />
      </View>
    );
  }

  return (
  <GestureHandlerRootView>
    <TouchableWithoutFeedback>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 0}
        style={styles.container}
      >
        {/* shopping list items in here */}
        <View style={styles.tasksWrapper}>

          <View style={styles.header}>
            <Text style={styles.sectionTitle}>Item's to collect:</Text>
            <TouchableOpacity onPress={signOutUser}>
              <Entypo name="log-out" size={35} color="black"/>
            </TouchableOpacity>
          </View>

          {items.length > 0 &&(
            <View style={styles.FlatListViewStyle}>
              <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item: Item) => item.id}
              contentContainerStyle={styles.flatListContentContainer}
              showsVerticalScrollIndicator={false}
              />
            </View>
          )}
          
        </View>

        {/* Write a item to add, inputfield and add button */}
        <View style={styles.writeTaskWrapper}>
          <TextInput style={styles.input} placeholder="Write item text" 
          onChangeText={(text: string) => setItem(text)}
          value={item}
          />

          {/* add button that will trigger function to add to Firestore */}
          <TouchableOpacity onPress={addItems}>
            <View style={styles.addWrapper}>
              <Text style={styles.addTextField}><FontAwesome6 name="add" size={20} color="black" /></Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    justifyContent: "center",
  },
  tasksWrapper: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,  
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  writeTaskWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
    fontSize: 16,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginBottom: 4,
  },
  addTextField: {},

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  itemText: {
    flex: 1,
    paddingHorizontal: 4,
    fontSize: 15,

  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  flatListContentContainer: {
    paddingBottom: 20,
  },

  logoutIcon: {
    alignItems: "center",
  },
  FlatListViewStyle: {
    flex: 1, 
    flexDirection: 'row',
  },

  
});

export default HomePage;
