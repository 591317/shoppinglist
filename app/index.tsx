import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Modal,
} from "react-native";

import { auth } from "./config/firebaseConfig";
import { FirebaseError } from "firebase/app";

import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const reactLogo = require('../assets/images/groceries.png');

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  // function that handles the sign up process
  const singUp = async () => {
    setLoading(true);
    try {
      if(password === confirmPassword){
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration completed");
        setModalVisible(!isModalVisible)
      } else{
        alert("Password and Confirm password dose not match")
      }
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Registration failed: Please fill in Email and Passwords fields");
    } finally {
      setLoading(false);
    }
  };

  // function to handle the toggle state of the modal pop-up. it sets the value of "isModalVisible" to the oppesite of what it was before
  const toggleRegisterModal = () => {
    setModalVisible(!isModalVisible)  
  };

  // function that handles the sign in process
  const singIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Login failed: Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  // this contains the view of the hole index page. that uses the styles variable that is a stylesheet
  return (
    <TouchableWithoutFeedback>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.headerSigninContainer}>
          <Text style={styles.headerText}>Sign in:</Text>
          <Image source={reactLogo} style={styles.logo} />
        </View>

        <View>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="default"
            autoCapitalize="none"
            placeholder="Email"
            placeholderTextColor={"#888"}
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={"#888"}
            
          />
          {loading ? (
            <ActivityIndicator size={"small"} style={{ margin: 28 }} />
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={singIn}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonOutline]}
                onPress={toggleRegisterModal}
              >
                <Text style={styles.buttonOutlineText}>Register user</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <Modal
           animationType="slide"
           transparent={false}
           visible={isModalVisible}
           onRequestClose={() =>{
            setModalVisible(!isModalVisible)
           }}
        >
          <View style={styles.container}>
          
          <Text style={styles.headerTextModal}>Register user:</Text>

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="default"
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor={"#888"}
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor={"#888"}
            />

            <TextInput
              style={[styles.input,
                confirmPassword !== password && confirmPassword !== '' && styles.inputError,
              ]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirm Password"
              placeholderTextColor={"#888"}
            />

            <View style={styles.buttonModalWrapper}>
              <TouchableOpacity 
              style={styles.buttonModalCancel} onPress={toggleRegisterModal}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            
              <TouchableOpacity
                  style={[styles.buttonModalRegister, styles.buttonOutline]}
                  onPress={singUp}
              >
                <Text style={styles.buttonOutlineText}>Register user</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

// this is the stylesheet that is used in the view. this contains a container and input styling. also has a button container and button styling.
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
    pointerEvents: "auto",
    fontSize: 16,
    
  },
  button: {
    backgroundColor: "#0782F9",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginLeft: 45,
  },
  buttonOutline: {
    backgroundColor: "white",
    borderColor: "#0782F9",
    marginTop: 10,
    borderWidth: 2,
  },
  buttonText: {
    color: "#white",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontSize: 16,
    fontWeight: "700",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 0,
    color: "#0782F9",
  },
  headerSigninContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginLeft: 50,
    marginTop: -65,  

  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputError:{
    borderColor: "red"
  },
  buttonModalWrapper:{
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
   
  },
  buttonModalCancel: {
    backgroundColor: "red",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    
  },
  buttonModalRegister: {
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginLeft: 25,
  },
  headerTextModal: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
    color: "#0782F9",
  },
});
