import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
// import firebase from "firebase/app";
// import firebaseSecret from "./firebaseSecret.json";
import Header from "./components/Header";

// firebase.initializeApp({
//   apiKey: firebaseSecret.apiKey,
//   authDomain: firebaseSecret.authDomain,
//   projectId: firebaseSecret.projectId,
//   storageBucket: firebaseSecret.storageBucket,
//   messagingSenderId: firebaseSecret.messagingSenderId,
//   appId: firebaseSecret.appId,
//   measurementId: firebaseSecret.measurementId,
// });

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header
          menuList={[
            { url: "/login", label: "sigh in" },
            { url: "/i", label: "transfer" },
          ]}
        />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
