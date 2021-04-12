import '../App.css';
import React from 'react';
import Login from '../componente/Login';
import ListaSondaje from './ListaSondaje';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import firebase from 'firebase';
import FirebaseInstance from "../Firebase";
import FormularSondajNou from "./FormularSondajNou";
import DetaliiSondaj from "./DetaliiSondaj";
import RaspunsDeschis from "./intrebari/RaspunsDeschis";
import ModelFormular from "./ModelFormular";

class App extends React.Component{
  constructor(props){
    super(props);
    const firebaseConfig = {
      apiKey: "AIzaSyAq2R4V9sSwwd7SUN4FPP7s5j8Mp-o_BjU",
      authDomain: "sondaje-de-opini.firebaseapp.com",
      projectId: "sondaje-de-opini",
      storageBucket: "sondaje-de-opini.appspot.com",
      messagingSenderId: "131575197286",
      appId: "1:131575197286:web:71eae5bff83f62a4dec7a7",
      measurementId: "G-FCPPVLYE94"
    };
    if (!firebase.apps.length) {
      let firebaseApp = firebase.initializeApp(firebaseConfig);
      FirebaseInstance().setInstance(firebaseApp);
    }
    firebase.analytics();
  }

  render(){
    return (
      <div className="App">
        <Router>
          <Switch>

            <Route path="/login">
              <Login/>
            </Route>

            <Route path="/sondaje">
              <ListaSondaje/>
            </Route>

            <Route path="/adaugare">
            <FormularSondajNou/>
            </Route>

            <Route path="/detalii">
              <DetaliiSondaj/>
            </Route>

            <Route path="/deschis">
              <RaspunsDeschis />
            </Route>

            <Route path="/model">
              <ModelFormular />
            </Route>

            <Route path="/">
              <Redirect to="/login"/>
            </Route>

          </Switch>
        </Router>
      </div>
    );
  }
}


export default App;
