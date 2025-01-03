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
  const [loading, setLoading] = useState(false);

  // function that handles the sign up process
  const singUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Check your email");
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // function that handles the sign in process
  const singIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // this contains the view of the hole index page. that uses the styles variable that is a stylesheet
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                onPress={singUp}
              >
                <Text style={styles.buttonOutlineText}>Create user</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
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
});
